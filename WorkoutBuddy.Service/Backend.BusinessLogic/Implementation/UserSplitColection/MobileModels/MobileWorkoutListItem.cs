using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserSplitColection.MobileModels
{
    public class MobileWorkoutListItem
    {
        public Guid WorkoutId { get; set; }
        public string Name { get; set; }
        public List<MobileExerciseListItem> Exercises { get; set; } = new List<MobileExerciseListItem>();
    }
}
