import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  debitHistory: any[] = [];
  debitAmount: FormControl = new FormControl('');
  upiId: FormControl = new FormControl('');
  errorMessage: string = '';
  loginUser: any;
  walletAmount: any = 0;

  constructor(
    private walletService: WalletService,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getDebitHistory();
    this.walletDetails();
  }

  // Function to use for the get the wallet history
  getDebitHistory(): void {
    this.debitHistory = [];
    this.walletService.debitAmountHistory().subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          this.debitHistory = response?.data || [];
        }
      },
      (error) => {
        console.log('wallet history get the error');
      }
    );
  }

  // Function to use for the debit amount from your wallet
  debitAmountFromWallet() {
    if (!this.debitAmount.value) {
      this.errorMessage = 'Please enter widraw amount.';
      return;
    }

    if (this.debitAmount.value < 100) {
      this.errorMessage = 'Minimum withdraw amount Rs. 100';
      return;
    }

    if (!this.upiId.value) {
      this.errorMessage = 'Please enter UPI ID';
      return;
    }

    const payload = {
      user_id: this.loginUser.id,
      amount: this.debitAmount.value,
      user_payment_id: this.upiId.value,
    };

    this.walletService.debitMoney(payload).subscribe(
      (response) => {
        if (response?.code === SUCCESS) {
          this.errorMessage = '';
          this.debitAmount.setValue('');
          this.upiId.setValue('');
          this.getDebitHistory();
        }
      },
      (error) => {
        console.log('this is debit error');
      }
    );
  }

  walletDetails(): void {
    this.walletService.getWallet().subscribe((response) => {
      if (response?.code == SUCCESS) {
        this.walletAmount = response?.data?.amount || 0;
      }
    });
  }
}
