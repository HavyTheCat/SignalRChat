import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';


@Component({
  selector: 'app-room-input',
  templateUrl: './room-input.component.html',
  styleUrls: ['./room-input.component.scss']
})
export class RoomInputComponent implements OnInit {

  public newMessageText = '';

  constructor(private crs: ChatRoomService) {}

  ngOnInit() {
  }

  public submit(newroom: string): void {
    this.crs.invokeCreateChatRoom(newroom);

    this.newMessageText = '';
  }


}
