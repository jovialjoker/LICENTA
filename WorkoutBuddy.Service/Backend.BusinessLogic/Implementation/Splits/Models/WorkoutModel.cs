using Backend.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Splits
{
    public class WorkoutModel
    {
        public Guid Id { get; set; }
        public string WorkoutName { get; set; } = string.Empty;
        public List<ListItemModel<string, Guid>> Exercises { get; set; } = new List<ListItemModel<string, Guid>>();
        public List<ListItemModel<string, int>> SelectedMuscleGroups { get; set; } = new List<ListItemModel<string, int>>();
        public bool IsDeleted { get; set; }
    }
}
