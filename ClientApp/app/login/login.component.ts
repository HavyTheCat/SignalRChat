import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Alert } from '../../classes/alert';
import { AlertService } from '../Shared/Services/alert.service';
import { AlertType } from '../../enums/alert-type.enum';
import { LoadingService } from '../Shared/Services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../Shared/Services/auth.service';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

private subscriptions: Subscription[] = [];
private returnUrl: string;
public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
    ) {
    this.CreateForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/chat';
  }

  private CreateForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  public submit(): void {
    this.loadingService.isLoading.next(true);
    if (this.loginForm.valid) {
      const{email, password} = this.loginForm.value;
      console.log(`Email: ${email}, pass:${password} `);
      this.subscriptions.push(this.auth.login(email, password).subscribe(success => {
        if (success) {
                this.router.navigate([this.returnUrl]);
        }
        this.loadingService.isLoading.next(false);
      })
      );
        } else {
          const failedLoginAlert = new Alert('Your login or pass not good enough buddy, try again', AlertType.Danger);
          this.alertService.alerts.next(failedLoginAlert);
          this.loadingService.isLoading.next(false);

        }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
