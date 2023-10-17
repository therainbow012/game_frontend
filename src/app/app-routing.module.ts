import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AuthGuard } from './core/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    // component: CommonLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'game',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./pages/functionality/game.module').then((m) => m.GameModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
