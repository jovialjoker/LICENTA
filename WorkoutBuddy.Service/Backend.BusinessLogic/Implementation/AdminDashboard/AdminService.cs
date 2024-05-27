using Backend.BusinessLogic.Base;
using Backend.Entities;
using Backend.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkoutBuddy.BusinessLogic.AdminDashboard
{
    public class AdminService : BaseService
    {
        public AdminService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public List<UserModel> GetUsers()
        {
            var list = new List<UserModel>();
            var userList = UnitOfWork.Users.Get()
                            .Include(u => u.Idroles)
                            .ToList();
            foreach (var user in userList)
            {
                var userModel = Mapper.Map<User, UserModel>(user);
                userModel.IsAdmin = user.Idroles.Select(r => r.Idrole).Contains((int)RoleTypes.Admin);
                list.Add(userModel);
            }
            return list;
        }
    }
}
