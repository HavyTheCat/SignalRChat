import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatRoomService } from '../../../Shared/Services/chatroom-service';
import { Observable, Subscription } from 'rxjs';
import { Room } from '../../../../classes/room';
import { ActivatedRoute } from '@angular/router';
import { runInThisContext } from 'vm';
import { Message } from '../../../../classes/message';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer',  {static: false}) private scrollContainer: ElementRef;


  private subs: Subscription[] = [];
  public chatroom: Room;

  public messages: Message[] = [];

  constructor(private chatRoomserv: ChatRoomService,
              private route: ActivatedRoute) {
                this.subs.push(
                  this.chatRoomserv.selectedChatroom.subscribe(
                    chatRoom => {
                      this.chatroom = chatRoom; }));
                this.subs.push(
                  this.chatRoomserv.selectedMessages.subscribe(
                    chatRoom => {
                      if(chatRoom) {
                        this.messages = chatRoom;
                      }
                      this.sortArr();
                    }));
                this.subs.push(
                  this.chatRoomserv.newmessage().subscribe( msg => {
                    this.messages.push(msg);
                    this.sortArr(); }));
                    }

  ngOnInit() {
    this.scrollToBottom();
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatRoomserv.InvokeJoinGroup(chatroomId);
        this.chatRoomserv.changeChatrooms.next(chatroomId);
      })
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private sortArr(): void {
    if (this.messages) {
      this.messages.sort((n1, n2) => {
        if (n1.createAt > n2.createAt) {
        return 1;
        }
        if (n1.createAt < n2.createAt) {
          return -1;
         }
        return 0;
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
