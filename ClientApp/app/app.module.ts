import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { Routes } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { ChatService } from './Shared/Services/chat-service.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './chat/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './chat/components/chatroom-window/chatroom-window.component';
import { AuthService } from './Shared/Services/auth.service';
import { from } from 'rxjs';
import { AlertService } from './Shared/Services/alert.service';
import { LoadingService } from './Shared/Services/loading.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpErrorInterceptor } from './interceptor';
import { ChatRoomService } from './Shared/Services/chatroom-service';
import { RoomInputComponent } from './chat/components/room-input/room-input.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent,
    RoomInputComponent,
    ProfileComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot(),
    NgxLoadingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ChatService,
    AuthService,
    AlertService,
    LoadingService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ChatRoomService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
