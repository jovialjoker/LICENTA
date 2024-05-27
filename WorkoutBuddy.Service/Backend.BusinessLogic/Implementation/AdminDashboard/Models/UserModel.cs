﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkoutBuddy.BusinessLogic.AdminDashboard
{
    public class UserModel
    {
        
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAdmin{ get; set; }
    }
}
