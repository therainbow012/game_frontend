import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './game-home/game-home.component';
import { NumberPredictionComponent } from './number-prediction/number-prediction.component';
import { WalletComponent } from './wallet/wallet.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorResultComponent } from './color-result/color-result.component';
import { NumberResultComponent } from './number-result/number-result.component';
import { PaymentComponent } from './wallet/payment/payment.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPredictionComponent } from './color-prediction/color-prediction.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: GameHomeComponent },
  { path: 'color-prediction', component: ColorPredictionComponent },
  { path: 'number-prediction', component: NumberPredictionComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
  declarations: [
    GameHomeComponent,
    ColorPredictionComponent,
    NumberPredictionComponent,
    WalletComponent,
    WithdrawComponent,
    ColorResultComponent,
    NumberResultComponent,
    PaymentComponent,
    PrivacyPolicyComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, NgbModule, NgbModalModule, FormsModule],
})
export class GameModule {}
