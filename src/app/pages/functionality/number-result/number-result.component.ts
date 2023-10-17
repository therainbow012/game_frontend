import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-number-result',
  templateUrl: './number-result.component.html',
  styleUrls: ['./number-result.component.scss'],
})
export class NumberResultComponent {
  isWin: boolean = false;
  resultNumber: string = '1';
  amount: string | number = 0;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.activeModal.close();
  }
}
