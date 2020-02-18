import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';
import { Message } from '../../../../classes/message';
import { AuthService } from '../../../Shared/Services/auth.service';
import { User } from '../../../../classes/User';

@Component({
  selector: 'app-chat-input',
 templateUrl: './chat-Input.component.html',
  styleUrls: ['./chat-Input.component.scss']
})
export class ChatInputComponent implements OnInit {


public newMessagetext: string = '';
private currentUser: User;

  constructor(private crs: ChatRoomService,
              private auth: AuthService ) {
                this.auth.getCurrentUser().subscribe(user => {
                  this.currentUser = user;
                });
              }

  ngOnInit() {
  }

  public submit(message: string): void {
    const newMesage = {
      message,
      createAt: new Date(),
      sender: this.currentUser
    };
    this.crs.invokeSandMsg(newMesage);

    this.newMessagetext = '';
  }

}
