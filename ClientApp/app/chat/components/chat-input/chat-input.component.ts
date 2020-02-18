import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';
import { Message } from '../../../../classes/message';
import { AuthService } from '../../../Shared/Services/auth.service';
import { User } from '../../../../classes/User';

@Component({
  selector: 'app-chat-input',
  template: '<div class="new-message-wraper d-flex">
  <div class="input-group">
    <input [(ngModel)]="newMessagetext" type="text" class="form-control" placeholder="Enter a new Meme" (keyup.enter)="submit(newMessage.value)" #newMessage>
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" (click)="submit(newMessage.value)" >Enter</button>
    </div>
  </div>
</div>',
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
