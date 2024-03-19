using AutoMapper;
using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkoutBuddy.BusinessLogic.AdminDashboard
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<User, UserModel>()
                .ForMember(s => s.UserId, s => s.MapFrom(s => s.Iduser))
                .ForMember(s => s.Email, s => s.MapFrom(s => s.Email))
                .ForMember(s => s.Username, s => s.MapFrom(s => s.Username))
                .ForMember(s => s.Name, s => s.MapFrom(s => s.Name))
                ;
        }

        
    }
}
