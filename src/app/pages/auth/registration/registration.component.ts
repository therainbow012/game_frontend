import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { Patterns } from 'src/app/core/consts/validation-patterns.const';
import { CustomValidation } from 'src/app/core/validations/custome-validation';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  defaultRegisterForm = {
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.name),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.name),
    ]),
    email: new FormControl(null, []),
    mobile_number: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.mobile),
    ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password),
    ]),
  };

  registerForm = new FormGroup(this.defaultRegisterForm, [
    CustomValidation.MatchValidator('password', 'confirm_password'),
  ]);

  error!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public registerUser(): void {
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.valid) {
      return
    }

    const registerUserData = {
      first_name: this.registerForm.controls.first_name.value,
      last_name: this.registerForm.controls.last_name.value,
      email:
        this.registerForm.controls.mobile_number.value + '@gmail.com' ||
        this.registerForm.controls.email.value,
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      mobile_number: this.registerForm.controls.mobile_number.value,
    };
    this.authService.registerNewUser(registerUserData).subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          this.router.navigateByUrl('/login');
        } else {
          this.error = response?.message;
        }
      },
      (error) => {
        console.log('this is error : ', error);
      }
    );
  }
}
