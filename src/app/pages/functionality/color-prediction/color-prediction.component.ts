import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { ColorPredictionService } from 'src/app/services/color-prediction/color-prediction.service';
import { ColorResultComponent } from '../color-result/color-result.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-color-prediction',
  templateUrl: './color-prediction.component.html',
  styleUrls: ['./color-prediction.component.scss'],
})
export class ColorPredictionComponent implements OnInit {
  display!: string;
  game_id!: string;
  showCoin: boolean = false;
  gameHistory: any[] = [];
  colorName: string = '';
  enterGameAmount: FormControl = new FormControl('');
  loginUser: any;
  amountError: string = '';
  gameStarted: boolean = false;
  activeColor!: string;
  walletAmount: any = 0;

  constructor(
    private colorPredictionService: ColorPredictionService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private walletService : WalletService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['gameStart'] == 'true') {
        this.gameStarted = true;
        this.showCoin = true;
      }
    });
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getGameHistory();
    this.getGameData();
    this.walletDetails();
  }

  openResult(
    selectedColor: string,
    resultColor: string,
    resultAmount: string | number
  ): void {
    const modalRef = this.modalService.open(ColorResultComponent, {
      modalDialogClass: 'modal-dialog-centered',
    });
    if (resultColor == 'orange') {
      modalRef.componentInstance.resultColor = '#FFA500';
    }
    if (resultColor == 'red') {
      modalRef.componentInstance.resultColor = '#FF0000';
    }
    if (resultColor == 'green') {
      modalRef.componentInstance.resultColor = '#008000';
    }
    if (resultColor == 'violate') {
      modalRef.componentInstance.resultColor = '#7F00FF';
    }

    if (resultColor == selectedColor) {
      modalRef.componentInstance.isWin = true;
      modalRef.componentInstance.amount = Number(resultAmount) * 2;
    } else {
      modalRef.componentInstance.isWin = false;
    }
  }

  // function to get the game history
  public getGameHistory(): void {
    this.gameHistory = [];
    this.colorPredictionService.getGameHistory().subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          this.gameHistory = response?.data || [];
        }
      },
      (error) => {
        console.log('error in game history', error);
      }
    );
  }

  // Function to use for the get game time and game details
  public getGameData(): void {
    this.colorPredictionService.getGameData().subscribe(
      (response) => {
        console.log('response', response);
        if (Object.keys(response?.data).length !== 0) {
          this.checkDifference(response?.data?.created_at);
          this.game_id = response?.data?.id;
        } else {
          this.gameStarted = false;
          this.showCoin = false;
        }
      },
      (error) => {
        console.log('this is error log data : ', error);
      }
    );
  }

  // Function to use for the timer show
  private timer(minutes: any): void {
    let totalSeconds: number = Math.floor(minutes * 60); // Convert minutes to total seconds
    const timer = setInterval(() => {
      const minutesLeft = Math.floor(totalSeconds / 60);
      const secondsLeft = totalSeconds % 60;
      const displayMinutes =
        minutesLeft < 10 ? '0' + minutesLeft : minutesLeft.toString();
      const displaySeconds =
        secondsLeft < 10 ? '0' + secondsLeft : secondsLeft.toString();

      this.display = `${displayMinutes} : ${displaySeconds}`;
      console.log('this.display', this.display);

      if (this.display == '00 : 00') {
        console.log('end game');
        // this.openResult();
        this.endGame();
      }
      if (totalSeconds === 0) {
        clearInterval(timer);
      } else {
        totalSeconds--;
      }
    }, 1000);
  }

  // Function to use for the check the time difference
  checkDifference(date: string): void {
    const backendDateTimeString = date;
    const backendDateTime = moment(backendDateTimeString);
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(backendDateTime));
    const decimalTimeDifference = duration.asMinutes();
    this.timer(decimalTimeDifference.toFixed(2));
    console.log(`Decimal Time Difference: ${decimalTimeDifference.toFixed(2)}`);
  }

  // function to be use for the start game
  public startGame(): any {
    if (!this.enterGameAmount.value) {
      return (this.amountError = 'Please select or enter beat amount.');
    }
    console.log('this.enterGameAmount.value', this.enterGameAmount.value);
    if (this.enterGameAmount.value < 10) {
      return (this.amountError = 'Minimum beat amount Rs. 10');
    }

    if (!this.game_id) {
      window.location.reload();
      return (this.amountError = 'Please reload the page');
    }

    const payload = {
      game_id: this.game_id || '1',
      user_id: this.loginUser.id,
      game_color: this.colorName,
      amount: this.enterGameAmount.value,
    };

    this.colorPredictionService.createGame(payload).subscribe(
      (response) => {
        if (response?.code == SUCCESS) {
          this.router.navigate(['/game/color-prediction'], {
            queryParams: { gameStart: true },
          });
          this.gameStarted = true;
        }
        console.log('Response from create Game', response);
        this.amountError = response?.message;
      },
      (error) => {
        console.log('create game error', error);
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

  // Function to use for the select color
  public selectColor(color: string, activeColor : string): void {
    this.showCoin = true;
    this.colorName = color;
    this.activeColor = activeColor;
  }

  // function to use for the handle the game amount
  public selectAmount(amount: number): void {
    this.enterGameAmount.setValue(amount);
  }

  // Function to use for the show game result
  public endGame(): void {
    const payload = {
      game_id: this.game_id || '1',
      user_id: this.loginUser.id,
    };

    this.colorPredictionService.endGame(payload).subscribe(
      (response) => {
        if (response?.data) {
          this.openResult(
            response?.data?.game_color,
            response?.data?.result_color,
            response?.data?.amount
          );
          this.showCoin = false;
          this.gameStarted = false;
          this.activeColor = "";
          this.colorName = "";
          this.game_id = '';
          this.enterGameAmount.setValue('');
          this.walletDetails()
          this.router.navigate(['/game/color-prediction'], {
            queryParams: { gameStart: false },
          });
          setTimeout(() => {
            this.getGameData();
          }, 500);
        }
        console.log('Response from create Game', response);
      },
      (error) => {
        console.log('create game error', error);
      }
    );
  }
}
