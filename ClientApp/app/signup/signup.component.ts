import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { AlertService } from '../Shared/Services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../Shared/Services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

private subscriptions: Subscription[] = [];
private returnUrl: string;

public signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    this.CreateForm();
  }

  ngOnInit() {
  }

  private CreateForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  public submit(): void {
    if (this.signupForm.valid) {
          const {firstName, lastName, email, password} = this.signupForm.value;
          console.log(`firstName:${firstName} lastName${lastName} Email: ${email}, pass:${password} `);
          this.subscriptions.push(this.auth.signup(firstName, lastName, email, password).subscribe(success => {
            if (success) {
                    this.router.navigate(['/chat']);
            } else {
              this.loadingService.isLoading.next(false);
            }
          })
          );
        } else {
          const failedSignUpAlert = new Alert('Give me valid name, email and password next time partner.', AlertType.Danger);
          this.alertService.alerts.next(failedSignUpAlert);
         }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
