using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Data.DTO;
using SignalRChat.Hubs;
using SignalRChat.Services.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Controllers.ApiControllers
{
    [Route("api/room")]
    public class ChatRoomController : Controller
    {
        private IRoomsRepository _roomrepo;
        private IMessageRepository _msgrepo;
        private readonly IMapper _mapper;
        public ChatRoomController(IRoomsRepository roomrepo,
            IMessageRepository mesagerepository,
            IMapper mapper)
        {
            _roomrepo = roomrepo;
            _msgrepo = mesagerepository;
            _mapper = mapper;

        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(string id)
        {
            if (Guid.TryParse(id, out Guid guidId))
                return Ok(await _roomrepo.GetRoom(guidId));
            else
                return BadRequest();
        }

        [HttpGet("{id}/messages")]
        public async Task<IActionResult> GetMessages(string id)
        {


            if (Guid.TryParse(id, out Guid guidId))
            {
                var msgList = await _msgrepo.GetRoomMessages(guidId);
                var res = new List<MessageVM>();
                foreach (var msg in msgList)
                    res.Add(_mapper.Map<MessageVM>(msg));
                return Ok(res);
            }   
            else
                return BadRequest();
        }
    }
}
