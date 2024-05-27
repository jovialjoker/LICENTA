using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserSplitColection.MobileModels
{
    public class UnfinishedExerciseListItem
    {
        public Guid ExerciseId { get; set; }
        public string Name { get; set; }
        public int SetsRecorded { get; set; }
    }
}
