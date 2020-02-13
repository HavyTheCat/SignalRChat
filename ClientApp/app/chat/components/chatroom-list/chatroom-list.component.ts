import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';
import { Room } from '../../../../classes/room';


@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  private rooms: Array<Room> = [];

  constructor(
    public chatroomserv: ChatRoomService
  ) { }

  ngOnInit() {
    this.chatroomserv.InvokeRooms();
    this.chatroomserv.chatrooms().subscribe(room => {this.rooms.push(room); });
  }

}
