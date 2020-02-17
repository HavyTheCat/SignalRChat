import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Shared/Services/auth.service';
import { User } from '../../../classes/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: User = null;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(user => { this.currentUser = user; }
    );
  }
}
