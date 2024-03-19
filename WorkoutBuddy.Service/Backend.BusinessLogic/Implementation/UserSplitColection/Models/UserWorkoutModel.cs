using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserSplitColection.Models
{
    public class UserWorkoutModel
    {
        public Guid SplitId { get; set; }
        public Guid UserId { get; set; }
        public Guid WorkoutId { get; set; }
        public DateTime? Date { get; set; } = DateTime.UtcNow;
        public List<UserExerciseModel>? Exercises { get; set; } = new List<UserExerciseModel>();
    }
}
