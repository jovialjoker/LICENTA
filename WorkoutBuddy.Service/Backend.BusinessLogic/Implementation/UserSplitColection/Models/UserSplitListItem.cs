using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserSplitColection.Models
{
    public class UserSplitListItem
    {
        public Guid SplitId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int WorkoutsNo { get; set; }
    }
}
