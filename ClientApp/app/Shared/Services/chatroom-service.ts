import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, BehaviorSubject, observable, of } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Alert } from '../../../classes/alert';
import { AlertType } from '../../../enums/alert-type.enum';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { Room } from '../../../classes/room';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Message } from '../../../classes/message';



@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

    connectionEstablished = new EventEmitter<Boolean>();
    private connectionIsEstablished = false;
    private _hubConnection: HubConnection;
    public changeChatrooms: BehaviorSubject<string> = new BehaviorSubject(null);
    public selectedChatroom: Observable<Room> = new Observable(null);
    public selectedMessages: Observable<Message[]> = new Observable(null);

    private currentRoom: string;


    private rooms = new EventEmitter<Room>(null);
    private message = new EventEmitter<Message>(null);

    public chatrooms(): Observable<Room> {
        return this.rooms.asObservable();
    }

    public newmessage(): Observable<Message> {
        return this.message.asObservable();
    }


    constructor(private auth: AuthService,
                private alertService: AlertService,
                private httpClient: HttpClient) {
                    this.createConnection();
                    this.selectedChatroom = this.changeChatrooms.pipe(switchMap((room: string) => {
                        this.currentRoom = room;
                        if (room) {
                            return this.httpClient.get<Room>(`/api/room/${room}`);
                        } else {
                            return of(null);
                        }
                    }));
                    this.selectedMessages = this.changeChatrooms.pipe(switchMap((room: string) => {
                        if (room) {
                            return this.httpClient.get<Room[]>(`/api/room/${room}/messages`);
                        } else {
                            return of(null);
                        }
                    }));
                }


private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('/RoomHub', {
        accessTokenFactory: () => this.auth.getToken()// Return access token
    })
      .build();
  }

  public InvokeRooms(): void {
      if (this.connectionIsEstablished) {
          this._hubConnection.invoke('GetRooms').catch(err => {
            this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
            console.log(err); });
      } else {
        this.startConnection().then(() => {
            this._hubConnection.invoke('GetRooms').catch(err => {
                this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
                console.log(err); });
        });
      }
  }

  public invokeSandMsg(msg: Message): void {
      if (this.currentRoom) {
        if (this.connectionIsEstablished) {
            this._hubConnection.invoke('Send', this.currentRoom, msg).catch(err => {
              this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
              console.log(err); });
        } else {
          this.startConnection().then(() => {
              this._hubConnection.invoke('Send', this.currentRoom, msg).catch(err => {
                  this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
                  console.log(err); });
          });
        }
    }
}


  public InvokeJoinGroup(room: string): void {
    if (!!room) {
    if (this.connectionIsEstablished) {
        this._hubConnection.invoke('JoinGroup', room).catch(err => {
          this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
          console.log(err); });
    } else {
      this.startConnection().then(() => {
          this._hubConnection.invoke('JoinGroup', room).catch(err => {
              this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
              console.log(err); });
      });
    }
}
}

public invokeCreateChatRoom(room: string): void {
    if (!!room) {
    if (this.connectionIsEstablished) {
        this._hubConnection.invoke('CreateRoom', room).catch(err => {
          this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
          console.log(err); });
    } else {
      this.startConnection().then(() => {
          this._hubConnection.invoke('CreateRoom', room).catch(err => {
              this.alertService.alerts.next(new Alert('Error while establishing connection', AlertType.Danger));
              console.log(err); });
      });
    }
}
}


  private startConnection(): Promise<void> {
    return this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        this.connectionEstablished.emit(true);
        this.registerOnServerEvents();
        this.registerOnNewMesageEvents();

      })
      .catch(err => {
        this.alertService.alerts.next(new Alert('Error while establishing connection, retrying...', AlertType.Danger));
        console.log(err);
        setTimeout(function() { this.startConnection(); }, 5000);
      });
  }

  private registerOnNewMesageEvents() {
     this._hubConnection.on('message', (data: Message) => {
         this.message.emit(data);
     });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('room', (data: Room) => {
        this.rooms.emit(data);
    });
  }

}
