import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';
import { Message } from '../../../../classes/message';
import { AuthService } from '../../../Shared/Services/auth.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-Input.component.html',
  styleUrls: ['./chat-Input.component.scss']
})
export class ChatInputComponent implements OnInit {

public newMessagetext: string = '';

  constructor(private crs: ChatRoomService,
              private auth: AuthService ) {}

  ngOnInit() {
  }

  public submit(message: string): void {
    const newMesage = {
      message,
      createAt: new Date(),
      sender: this.auth.getUser()
    };
    this.crs.invokeSandMsg(newMesage);

    this.newMessagetext = '';
  }

}
