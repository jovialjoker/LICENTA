using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserSplitColection.MobileModels
{
    public class UnfinishedWorkoutListItem
    {
        public Guid WorkoutId { get; set; }
        public DateTime Date {  get; set; }
        public string Name { get; set; }
        public List<UnfinishedExerciseListItem> Exercises { get; set; }
    }
}
