import { Injectable } from '@angular/core';
// import { LoginUserModel } from 'src/app/shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Function to use for the set login user details in localStorage
  setLogger(details: any): void {
    this.clearStorage();
    const loginData = JSON.stringify(details);
    localStorage.setItem('GameLoginUser', loginData);
    localStorage.setItem('GameUserToken', details?.token);
  }

  // Set the updated loginUser details
  updateUserDetails(details: any): void {
    const loginData = JSON.stringify(details);
    localStorage.setItem('GameLoginUser', loginData);
  }

  // Function to use for the get login user details from the localStorage
  getLogger(): any {
    const loginUser: any = localStorage.getItem('GameLoginUser');
    return JSON.parse(loginUser);
  }

  // Function to use for the get login user token from the localStorage
  getLoggerToken(): void {
    const loginToken: any = localStorage.getItem('GameUserToken');
    return loginToken;
  }

  // Function to use for the clear localStorage
  clearStorage(): void {
    localStorage.clear();
  }
}
