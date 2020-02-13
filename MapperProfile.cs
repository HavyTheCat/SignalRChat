using AutoMapper;
using SignalRChat.Data.DTO;
using SignalRChat.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<SignUpVM, AppUser>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.NicName)).ReverseMap();

            CreateMap<AppUser, UserDTO>()
                .ForMember(dest => dest.firstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.nicname, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.photoUrl, opt => opt.MapFrom(src => src.PhotoUrl)).ReverseMap();

            CreateMap<Message, MessageVM>()
                .ForMember(dest => dest.createAt, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.sender, opt => opt.MapFrom(src => src.sender))
                .ForMember(dest => dest.message, opt => opt.MapFrom(src => src.MessageText)).ReverseMap();


        }
    }
}
