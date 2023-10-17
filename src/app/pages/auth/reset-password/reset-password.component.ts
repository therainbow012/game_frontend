import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patterns } from 'src/app/core/consts/validation-patterns.const';
import { CustomValidation } from 'src/app/core/validations/custome-validation';
import { SUCCESS } from 'src/app/core/consts/response-status.const';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  userName!: string | null;

  defaultResetForm = {
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password),
    ]),
  };

  resetForm = new FormGroup(this.defaultResetForm, [
    CustomValidation.MatchValidator('password', 'confirm_password'),
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.userName = params.get('userName');
      // console.log('vvvv', param1);
      if(!this.userName) {
        this.router.navigateByUrl('/forgot-password')
      }
    });
  }

  ngOnInit(): void {}

  // Function use for the reset-password
  resetPassword(): void {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.valid) {
      const resetFormData = {
        username: this.userName,
        password: this.resetForm.controls.password.value,
      };
      this.authService.resetPassword(resetFormData).subscribe(
        (response) => {
          if (response?.code === SUCCESS) {
            console.log('this is reset password success fully : ');
            // this.notificationService.showSuccess(response?.message);
            this.router.navigateByUrl('/login');
          } else {
            // this.notificationService.showError(response?.message);
          }
        },
        (error) => {
          // this.notificationService.showError(error?.message);
        }
      );
    }
  }
}
