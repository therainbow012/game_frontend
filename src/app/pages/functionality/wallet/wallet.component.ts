import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { PaymentComponent } from './payment/payment.component';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  walletHistory: any[] = [];
  amount: FormControl = new FormControl('');
  upiID: FormControl = new FormControl('');
  paymentMode: string = 'Google Pay';
  errorMessage: string = '';
  loginUser: any;
  walletAmount : number = 0;
  availableWallet : any;

  constructor(
    private walletService: WalletService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    // this.getAccount();
    this.getWalletHistory();
    this.walletDetails()
  }

  public openQR(image: any, upiId: string): void {
    const modalRef = this.modalService.open(PaymentComponent);
    modalRef.componentInstance.qrCodeImage = image;
    modalRef.componentInstance.UPIId = upiId;
  }

  walletDetails(): void {
    this.walletService.getWallet().subscribe(response => {
      if(response?.code == SUCCESS) {
        this.walletAmount = response?.data?.amount || 0;
      }
    })
  }

  // Function to use for the get the wallet history
  getWalletHistory(): void {
    this.walletHistory = [];
    this.walletService.walletHistory().subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          this.walletHistory = response?.data || [];
        }
      },
      (error) => {
        console.log('wallet history get the error');
      }
    );
  }

  // Function to use for the add money in wallet
  addMoney() {
    console.log('amount', this.amount.value, this.paymentMode);

    if (!this.amount.value || !this.paymentMode) {
      this.errorMessage = 'Please enter amount and select payment mode.';
      return;
    }

    if (this.amount.value < 50) {
      this.errorMessage = 'Add wallet min amount Rs. 50';
      return;
    }

    if (!this.upiID.value) {
      this.errorMessage = 'Please enter UIP Id';
      return;
    }

    const payload = {
      user_id: String(this.loginUser.id),
      amount: String(this.amount.value),
      payment_mode: this.paymentMode,
      user_payment_id: this.upiID.value || '1',
    };

    this.walletService.addMoney(payload).subscribe(
      (response) => {
        this.errorMessage = '';
        this.amount.setValue('');
        this.upiID.setValue('');
        this.getAccount();
      },
      (error) => {
        console.log('eerorororr', error);
      }
    );
  }

  // function to use for get active bank acount
  public getAccount(): void {
    this.walletService.getAccount().subscribe((response) => {
      if (response?.code == SUCCESS) {
        this.openQR(response?.data?.image, response?.data?.upi_id);
        this.getWalletHistory();
        this.walletDetails();
      }
    });
  }
}
