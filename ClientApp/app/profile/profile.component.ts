import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../classes/User';
import { AuthService } from '../Shared/Services/auth.service';
import { LoadingService } from '../Shared/Services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private auth: AuthService,
    private loading: LoadingService,
    private route: ActivatedRoute
  ) {
    this.loading.isLoading.next(true);
   }

  currentUser: User;
  user: User;
  private subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(
      this.auth.getCurrentUser().subscribe(currentUser => {
        this.currentUser = currentUser;
        this.loading.isLoading.next(false);
      })
    );
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        const userId = params.get('userId');
        this.subs.push(
          this.auth.getUser(userId).subscribe(user => {
            this.user = user; }
        ));
      })
    );

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
