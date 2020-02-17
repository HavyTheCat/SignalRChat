import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../Shared/Services/loading.service';
import { AuthService } from '../Shared/Services/auth.service';
import { User } from '../../classes/User';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UpLoadingService } from '../Shared/Services/up-loading.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {



  constructor(private auth: AuthService,
              private loading: LoadingService,
              private route: ActivatedRoute,
              private location: Location,
              private uploadserv: UpLoadingService,
              private router: Router
              ) {
                this.loading.isLoading.next(true);
               }

  currentUser: User;
  private userId: string;
  private subs: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string | null = null;

  ngOnInit() {
    this.subs.push(
      this.auth.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.loading.isLoading.next(false);
      })
    );
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }
  public uploadFile(event): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.uploadserv.UploadImage(formData);
    this.subs.push(this.uploadserv.GetUrl().subscribe(url => {
      this.downloadUrl = url;
      console.log(this.downloadUrl);
    }));
    this.subs.push(this.uploadserv.GetProgress().subscribe(perc => {
      if (perc < 100) {
        this.loading.isLoading.next(true);
      } else {
        this.loading.isLoading.next(false);
        this.auth.getCurrentUser();
      }
      this.uploadPercent = perc;
    }));
  }

  public save(): void {
    this.currentUser.photoUrl = this.downloadUrl;
    this.subs.push(this.auth.updateProfile(this.currentUser).subscribe(success => {
      if (success) {
              this.router.navigate(['/chat']); }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
