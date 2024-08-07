﻿using Backend.BusinessLogic.Base;
using Backend.Common.DTOs;
using Backend.Common.Exceptions;
using Backend.Common.Extensions;
using Backend.Entities;
using Backend.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Exercises
{
    public class ExerciseService : BaseService
    {
        private readonly InsertExerciseValidator _insertExerciseValidator;

        public ExerciseService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
            _insertExerciseValidator = new InsertExerciseValidator(UnitOfWork);
        }

        /*public int NumberOfPages(int pageSize)
        {
            var exercisesNo = UnitOfWork.Exercises.Get().ToList().Count;
            return exercisesNo / pageSize + 1;
        }*/

        public async Task<List<ExerciseAsListItemModel>> GetExercises(IEnumerable<int>? MuscleGroup, string? Search)
        {
            var exercisesList = new List<ExerciseAsListItemModel>();
            var listOfExercises = await UnitOfWork.Exercises
                .Get()
                .Include(e => e.Idgroups)
                .Where(e => e.IsPending != true)
                .OrderBy(e => e.Name)
                .ToListAsync();

            if(MuscleGroup is not null && MuscleGroup.Count() > 0)
            {
                listOfExercises = listOfExercises.Where(e => e.Idgroups.Any(id => MuscleGroup.Contains(id.Idgroup))).ToList();
            }

            if(!string.IsNullOrEmpty(Search))
            {
                listOfExercises = listOfExercises.Where(e => e.Name.Contains(Search)).ToList();
            }

            if (listOfExercises == null)
            {
                return exercisesList;
            }

            foreach (var exercise in listOfExercises)
            {
                var exerciseModel = new ExerciseAsListItemModel()
                {
                    ExerciseId = exercise.Idexercise,
                    Name = exercise.Name,
                    IdImage = exercise.Idimage,
                    ExerciseType = Enum.GetName(typeof(ExerciseTypes), exercise.Idtype)
                };

                exercisesList.Add(exerciseModel);
            }
            return exercisesList;
        }

        public ExercisesModel GetExercise(Guid exerciseId)
        {
            var exercise = UnitOfWork.Exercises.Get()
                .Include(e => e.Idgroups)
                .FirstOrDefault(e => e.Idexercise == exerciseId);
            if (exercise == null)
            {
                throw new NotFoundErrorException("Exercise not found");
            }

            var mappings = UnitOfWork.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == exercise.Idtype);
            var model = Mapper.Map<Exercise, ExercisesModel>(exercise);
            model.ExerciseType = mappings.Type;
            return model;
        }

        public async Task<InsertExerciseModel> GetInsertExerciseModel(Guid id)
        {
            var exerciseTypes = Enum.GetValues(typeof(ExerciseTypes)).Cast<ExerciseTypes>()
                            .Select(v => new ListItemModel<string, int>
                            {
                                Label = v.ToString(),
                                Value = ((int)v)
                            }).ToList();
            var muscleGroups = Enum.GetValues(typeof(MuscleGroups)).Cast<MuscleGroups>()
                .Select(v => new ListItemModel<string, int>
                {
                    Label = v.ToString(),
                    Value = ((int)v),
                }).ToList();

            var model = new InsertExerciseModel()
            {
                ExerciseTypes = exerciseTypes,
                MuscleGroups = muscleGroups
            };

            if (id != Guid.Empty)
            {
                var exercise = await UnitOfWork.Exercises
                                        .Get()
                                        .Include(e => e.IdtypeNavigation)
                                        .Include(e => e.Idgroups)
                                        .FirstOrDefaultAsync(e => e.Idexercise == id);
                Mapper.Map<Exercise, InsertExerciseModel>(exercise, model);
                model.SelectedMuscleGroups = exercise.Idgroups
                                                .Select(mg => new ListItemModel<string, int>
                                                {
                                                    Value = mg.Idgroup,
                                                    Label = mg.Name
                                                })
                                                .ToList();

                model.SelectedType = new ListItemModel<string, int>
                {
                    Value = exercise.IdtypeNavigation.Idtype,
                    Label = exercise.IdtypeNavigation.Type
                };
            }

            return model;
        }

        public void AddExercise(InsertExerciseModel model)
        {
            ExecuteInTransaction(uow =>
            {

                _insertExerciseValidator.Validate(model).ThenThrow(model);

                var image = new Image();
                image.Idimg = Guid.NewGuid();
                using (var ms = new MemoryStream())
                {
                    model.Image.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    image.ImgContent = fileBytes;
                }

                var typeEntity = uow.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == model.SelectedType.Value);

                var exercise = Mapper.Map<InsertExerciseModel, Exercise>(model);
                exercise.Idimage = image.Idimg;
                exercise.IdimageNavigation = image;
                exercise.Idtype = model.SelectedType.Value;
                exercise.IdtypeNavigation = typeEntity;

                var selectedMGs = model.SelectedMuscleGroups
                                            .Select(mg => mg.Value)
                                            .ToList();

                var musclesList = uow.MuscleGroups
                                .Get()
                                .Where(g => selectedMGs.Contains(g.Idgroup))
                                .ToList();

                musclesList.ForEach(m => exercise.Idgroups.Add(m));
                exercise.Idgroups = musclesList;

                uow.Exercises.Insert(exercise);
                uow.SaveChanges();
            });
        }

        public void EditExercise(InsertExerciseModel model)
        {
            ExecuteInTransaction(uow =>
            {
                _insertExerciseValidator.Validate(model).ThenThrow(model);

                var exercise = uow.Exercises.Get()
                            .Include(e => e.Idgroups)
                            .Include(e => e.IdimageNavigation)
                            .Include(e => e.IdtypeNavigation)
                            .FirstOrDefault(e => e.Idexercise == model.ExerciseId);

                if (exercise == null)
                {
                    throw new NotFoundErrorException("Exercise not found");
                }

                if (model.Image != null)
                {
                    var image = exercise.IdimageNavigation;
                    if (image == null)
                    {
                        image = new Image();
                        image.Idimg = Guid.NewGuid();
                    }

                    using (var ms = new MemoryStream())
                    {
                        model.Image.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        image.ImgContent = fileBytes;
                    }
                    exercise.Idimage = image.Idimg;
                    exercise.IdimageNavigation = image;
                }

                var typeEntity = uow.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == model.SelectedType.Value);
                exercise.Idtype = typeEntity.Idtype;
                exercise.IdtypeNavigation = typeEntity;
                exercise.Name = model.Name;
                exercise.Description = model.Description;

                exercise.Idgroups.Clear();


                var musclesList = uow.MuscleGroups
                    .Get()
                    .Where(g => model.SelectedMuscleGroups.Select(mg => mg.Value).Contains(g.Idgroup))
                    .ToList();

                musclesList.ForEach(m => exercise.Idgroups.Add(m));

                uow.Exercises.Update(exercise);
                uow.SaveChanges();
            });
        }

        public void DeleteExercise(Guid id)
        {
            ExecuteInTransaction(uow =>
            {
                var exercise = uow.Exercises
                            .Get()
                            .Include(e => e.Idgroups)
                            .Include(e => e.IdimageNavigation)
                            .Include(e => e.IdtypeNavigation)
                            .FirstOrDefault(e => e.Idexercise == id);

                if (exercise == null)
                {
                    throw new NotFoundErrorException("Exercise not found");
                }
                exercise.Idgroups.Clear();
                uow.Exercises.Delete(exercise);
                uow.SaveChanges();
            });
        }

        public async Task<List<ListItemModel<string, string>>> GetFilteredExercises(List<string> selectedGroups)
        {
            var groups = UnitOfWork.MuscleGroups.Get()
                .Where(m => selectedGroups.Contains(m.Idgroup.ToString()));

            if (groups == null)
            {
                throw new NotFoundErrorException("invalid muscle groups!");
            }
            var exercises = await groups.SelectMany(m => m.Idexercises)
                            .Where(e => e.IsPending != true)
                            .Distinct()
                            .ToListAsync();

            var list = new List<ListItemModel<string, string>>();

            foreach (var ex in exercises)
            {
                list.Add(new ListItemModel<string, string>()
                {
                    Value = ex.Idexercise.ToString(),
                    Label = ex.Name
                });
            }

            return list;
        }

        public List<ExerciseAsListItemModel> GetPendingExercises()
        {
            var exercisesList = new List<ExerciseAsListItemModel>();
            var listOfExercises = UnitOfWork.Exercises
                .Get()
                .Where(e => e.IsPending == true)
                .OrderBy(e => e.Name)
                .ToList();

            if (listOfExercises == null)
            {
                return exercisesList;
            }

            foreach (var exercise in listOfExercises)
            {
                var exerciseType = UnitOfWork.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == exercise.Idtype).Type;
                var exerciseModel = Mapper.Map<Exercise, ExerciseAsListItemModel>(exercise);
                exerciseModel.ExerciseType = exerciseType;
                exercisesList.Add(exerciseModel);
            }
            return exercisesList;
        }

        public bool ApproveExercise(Guid id)
        {
            var isOk = true;
            ExecuteInTransaction(uow =>
            {
                var exercise = uow.Exercises.Get()
                                .FirstOrDefault(e => e.Idexercise == id);
                if (exercise == null)
                {
                    throw new NotFoundErrorException("this exercise does not exist");
                }

                exercise.IsPending = false;

                try
                {
                    uow.Exercises.Update(exercise);
                    uow.SaveChanges();

                }
                catch (Exception e)
                {
                    isOk = false;
                }

            });
            return isOk;
        }

        /*
                public List<ExerciseAsListItemModel> GetPendingExercises()
                {
                    var exercisesList = new List<ExerciseAsListItemModel>();
                    var listOfExercises = UnitOfWork.Exercises
                        .Get()
                        .Where(e => e.IsPending == true)
                        .OrderBy(e => e.Name)
                        .ToList();

                    if (listOfExercises == null)
                    {
                        return exercisesList;
                    }

                    foreach (var exercise in listOfExercises)
                    {
                        var exerciseType = UnitOfWork.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == exercise.Idtype).Type;
                        var exerciseModel = Mapper.Map<Exercise, ExerciseAsListItemModel>(exercise);
                        exerciseModel.ExerciseType = exerciseType;
                        exercisesList.Add(exerciseModel);
                    }
                    return exercisesList;
                }

                public bool ApproveExercise(Guid id)
                {
                    var isOk = true;
                    ExecuteInTransaction(uow =>
                    {
                        var exercise = uow.Exercises.Get()
                                        .FirstOrDefault(e => e.Idexercise == id);
                        if (exercise == null)
                        {
                            throw new NotFoundErrorException("this exercise does not exist");
                        }

                        exercise.IsPending = false;

                        try
                        {
                            uow.Exercises.Update(exercise);
                            uow.SaveChanges();

                        }
                        catch (Exception e)
                        {
                            isOk = false;
                        }

                    });
                    return isOk;
                }

                public ExercisesModel GetExercise(Guid exerciseId)
                {
                    var exercise = UnitOfWork.Exercises.Get()
                        .Include(e => e.Idgroups)
                        .FirstOrDefault(e => e.Idexercise == exerciseId);
                    if (exercise == null)
                    {
                        throw new NotFoundErrorException("Exercise not found");
                    }

                    var mappings = UnitOfWork.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == exercise.Idtype);
                    var model = Mapper.Map<Exercise, ExercisesModel>(exercise);
                    model.ExerciseType = mappings.Type;
                    return model;
                }

                public void AddExercise(AddExerciseModel model)
                {
                    ExecuteInTransaction(uow =>
                    {

                        var validationRes = AddExerciseValidator.Validate(model);

                        if (!validationRes.IsValid)
                        {
                            var exerciseTypes = Enum.GetValues(typeof(ExerciseTypes)).Cast<ExerciseTypes>()
                                   .Select(v => new ListItemModel<string, int>
                                   {
                                       Text = v.ToString(),
                                       Value = ((int)v)
                                   }).ToList();
                            var muscleGroups = Enum.GetValues(typeof(MuscleGroups)).Cast<MuscleGroups>()
                                .Select(v => new System.Web.Mvc.SelectListItem()
                                {
                                    Text = v.ToString(),
                                    Value = ((int)v).ToString(),
                                }).ToList();
                            model.ExerciseTypes = exerciseTypes;
                            model.MuscleGroups = muscleGroups;

                            validationRes.ThenThrow(model);
                        }


                        var image = new Image();
                        image.Idimg = Guid.NewGuid();
                        using (var ms = new MemoryStream())
                        {
                            model.Image.CopyTo(ms);
                            var fileBytes = ms.ToArray();
                            image.ImgContent = fileBytes;
                        }

                        var typeEntity = uow.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == model.SelectedType);

                        var exercise = Mapper.Map<AddExerciseModel, Exercise>(model);
                        exercise.Idimage = image.Idimg;
                        exercise.IdimageNavigation = image;
                        exercise.IdtypeNavigation = typeEntity;

                        var musclesList = uow.MuscleGroups
                                        .Get()
                                        .Where(g => model.SelectedMuscleGroups.Contains(g.Idgroup))
                                        .ToList();

                        musclesList.ForEach(m => exercise.Idgroups.Add(m));
                        exercise.Idgroups = musclesList;

                        uow.Exercises.Insert(exercise);
                        uow.SaveChanges();
                    });
                }

                public void DeleteExercise(Guid id)
                {
                    ExecuteInTransaction(uow =>
                    {
                        var exercise = uow.Exercises
                                    .Get()
                                    .Include(e => e.Idgroups)
                                    .Include(e => e.IdimageNavigation)
                                    .Include(e => e.IdtypeNavigation)
                                    .FirstOrDefault(e => e.Idexercise == id);
                        if (exercise == null)
                        {
                            throw new NotFoundErrorException("Exercise not found");
                        }
                        exercise.Idgroups.Clear();
                        uow.Exercises.Delete(exercise);
                        uow.SaveChanges();
                    });
                }

                public EditExerciseModel PopulateEditModel(Guid id)
                {
                    var exerciseTypes = Enum.GetValues(typeof(ExerciseTypes)).Cast<ExerciseTypes>()
                                   .Select(v => new ListItemModel<string, int>
                                   {
                                       Text = v.ToString(),
                                       Value = ((int)v)
                                   }).ToList();
                    var muscleGroups = Enum.GetValues(typeof(MuscleGroups)).Cast<MuscleGroups>()
                        .Select(v => new System.Web.Mvc.SelectListItem()
                        {
                            Text = v.ToString(),
                            Value = ((int)v).ToString(),
                        }).ToList();

                    var exercise = UnitOfWork.Exercises.Get()
                                    .Include(e => e.Idgroups)
                                    .Include(e => e.IdimageNavigation)
                                    .Include(e => e.IdtypeNavigation)
                                    .FirstOrDefault(e => e.Idexercise == id);

                    if (exercise == null)
                    {
                        throw new NotFoundErrorException("Exercise not found");
                    }

                    var selectedGroups = exercise.Idgroups.Select(g => g.Idgroup).ToList();

                    var model = Mapper.Map<Exercise, EditExerciseModel>(exercise);
                    model.ExerciseTypes = exerciseTypes;
                    model.SelectedMuscleGroups = selectedGroups;
                    model.MuscleGroups = muscleGroups;
                    return model;
                }

                public void EditExercise(EditExerciseModel model)
                {
                    ExecuteInTransaction(uow =>
                    {
                        var validationRes = EditExerciseValidator.Validate(model);

                        if (!validationRes.IsValid)
                        {
                            var returnModel = PopulateEditModel(model.ExerciseId);
                            validationRes.ThenThrow(returnModel);
                        }

                        var exercise = uow.Exercises.Get()
                                    .Include(e => e.Idgroups)
                                    .Include(e => e.IdimageNavigation)
                                    .Include(e => e.IdtypeNavigation)
                                    .FirstOrDefault(e => e.Idexercise == model.ExerciseId);

                        if (exercise == null)
                        {
                            throw new NotFoundErrorException("Exercise not found");
                        }

                        if (model.Image != null)
                        {
                            var image = exercise.IdimageNavigation;
                            if (image == null)
                            {
                                image = new Image();
                                image.Idimg = Guid.NewGuid();
                            }

                            using (var ms = new MemoryStream())
                            {
                                model.Image.CopyTo(ms);
                                var fileBytes = ms.ToArray();
                                image.ImgContent = fileBytes;
                            }
                            exercise.Idimage = image.Idimg;
                            exercise.IdimageNavigation = image;
                        }

                        var typeEntity = uow.ExerciseTypes.Get().FirstOrDefault(t => t.Idtype == model.SelectedType);
                        exercise.Idtype = typeEntity.Idtype;
                        exercise.IdtypeNavigation = typeEntity;
                        exercise.Name = model.Name;
                        exercise.Description = model.Description;

                        exercise.Idgroups.Clear();
                        var musclesList = uow.MuscleGroups
                            .Get()
                            .Where(g => model.SelectedMuscleGroups.Contains(g.Idgroup))
                            .ToList();

                        musclesList.ForEach(m => exercise.Idgroups.Add(m));

                        uow.Exercises.Update(exercise);
                        uow.SaveChanges();
                    });
                }

                */
    }
}