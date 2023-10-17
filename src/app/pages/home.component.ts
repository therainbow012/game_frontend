import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public logOut() {
    this.router.navigate(['/logout']);
    this.localStorageService.clearStorage();
  }
}
