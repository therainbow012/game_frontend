import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseLogin } from 'src/app/common/base-login';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { Patterns } from 'src/app/core/consts/validation-patterns.const';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseLogin implements OnInit {
  defaultLoginForm = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(Patterns.password),
    ]),
  };

  loginForm = new FormGroup(this.defaultLoginForm, []);

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {}

  login(): void {
    // this.router.navigateByUrl('/game/home');
    // return
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      return console.log('this is invalid form', this.loginForm.valid);
    }

    this.authService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log('response', response)
        if (response?.code == SUCCESS) {
          console.log('thi is success  : ', response);
          this.localStorageService.setLogger(response?.data);
          this.router.navigateByUrl('/game/home');
        } else {
          return console.log('this is response error', response);
        }
      },
      (error) => {
        console.log('this is error : ', error);
      }
    );
  }
}
