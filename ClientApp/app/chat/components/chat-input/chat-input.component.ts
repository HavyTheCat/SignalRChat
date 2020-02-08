import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-Input.component.html',
  styleUrls: ['./chat-Input.component.scss']
})
export class ChatInputComponent implements OnInit {

public newMessagetext: string = '';

  constructor() { }

  ngOnInit() {
  }

  public submit(message: string): void{
    console.log('Msg', message);

    this.newMessagetext = '';
  }

}
