import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-result',
  templateUrl: './color-result.component.html',
  styleUrls: ['./color-result.component.scss'],
})
export class ColorResultComponent implements OnInit {
  isWin: boolean = false;
  resultColor: string = '#ff9c19';
  amount: string = "0";

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.activeModal.close();
  }
}
