import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  defaultForgotForm = {
    username: new FormControl('', [Validators.required]),
  };

  forgotForm = new FormGroup(this.defaultForgotForm, []);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  forgotPassword(): void {
    this.forgotForm.markAllAsTouched();

    if (!this.forgotForm.valid) {
      return
    }

    this.authService.forgotPassword(this.forgotForm.value).subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          // this.router.navigateByUrl('/reset-password', { state: { userName: this.forgotForm.controls.username } });
          // history.pushState({ userName:  this.forgotForm.controls.username }, '', '/reset-password');
          this.router.navigate(['/reset-password'], { queryParams: { userName: this.forgotForm.controls.username.value } });
        } else {
          return
        }
      },
      (error) => {
        console.log('this is error : ', error);
      }
    );
  }
}
