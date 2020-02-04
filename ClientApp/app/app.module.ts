import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { Routes } from '@angular/router';
import { ChatService } from './Shared/Services/chat-service.service';

// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'Messages', component: MessageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
