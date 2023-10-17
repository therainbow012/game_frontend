import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {

  UPIId!: string;
  qrCodeImage: any;
  imagePath: any;

  constructor(private activeModal: NgbActiveModal, private _sanitizer: DomSanitizer) {
    setTimeout(() => {
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + this.qrCodeImage);
      console.log('imagePath', this.imagePath, this.qrCodeImage)
    }, 1000);
  }

  public closePopup() {
    this.activeModal.close();
  }
}
