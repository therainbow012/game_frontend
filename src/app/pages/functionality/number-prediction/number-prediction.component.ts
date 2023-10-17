import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SUCCESS } from 'src/app/core/consts/response-status.const';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NumberPredictionService } from 'src/app/services/number-prediction/number-prediction.service';
import { NumberResultComponent } from '../number-result/number-result.component';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-number-prediction',
  templateUrl: './number-prediction.component.html',
  styleUrls: ['./number-prediction.component.scss'],
})
export class NumberPredictionComponent implements OnInit {
  loginUser: any;
  gameHistory: any[] = [];
  display!: string;
  game_id!: string;
  showCoin: boolean = false;
  selectedNumber!: string;
  enterGameAmount: FormControl = new FormControl('');
  amountError!: string;
  gameStarted: boolean = false;
  walletAmount: any = 0;

  constructor(
    private numberPredictionService: NumberPredictionService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private walletService : WalletService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['gameStart'] == 'true') {
          this.gameStarted = true
          this.showCoin = true
      }
    });
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getGameHistory();
    this.getGameData();
    this.walletDetails();
  }

  // get game history
  public getGameHistory(): void {
    this.gameHistory = [];
    this.numberPredictionService.getGameHistory().subscribe(
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

  // Implement timer functionality
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

  // Function to use for the show win and loss game result
  openResult(
    selectedNumber: string,
    resultNumber: string,
    amount: string | number
  ): void {
    const modalRef = this.modalService.open(NumberResultComponent, {
      modalDialogClass: 'modal-dialog-centered',
    });
    modalRef.componentInstance.resultNumber = resultNumber;

    if (resultNumber == selectedNumber) {
      modalRef.componentInstance.isWin = true;
      modalRef.componentInstance.amount = Number(amount) * 2;
    } else {
      modalRef.componentInstance.isWin = false;
    }
  }

  // Function to use for the get game time and game details
  public getGameData(): void {
    this.numberPredictionService.getGameData().subscribe(
      (response) => {
        console.log('response', response);
        if (Object.keys(response?.data).length !== 0) {
          this.checkDifference(response?.data?.created_at);
          this.game_id = response?.data?.id;
        } else {
          this.gameStarted = false
          this.showCoin = false
        }
      },
      (error) => {
        console.log('this is error log data : ', error);
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
  public selectNumber(number: string): void {
    this.showCoin = true;
    this.selectedNumber = number;
  }

  // function to use for the handle the game amount
  public selectAmount(amount: number): void {
    this.enterGameAmount.setValue(amount);
  }

  // Function to use for the start game
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
      game_number: this.selectedNumber,
      amount: this.enterGameAmount.value,
    };

    this.numberPredictionService.createGame(payload).subscribe(
      (response) => {
        console.log('Response from create Game', response);
        if (response?.code == SUCCESS) {
          this.router.navigate(['/game/number-prediction'], {
            queryParams: { gameStart: true },
          });
          this.gameStarted = true;
        }
        this.amountError = response?.message;
      },
      (error) => {
        console.log('create game error', error);
      }
    );
  }

  // Function to use for the show game result
  public endGame(): void {
    const payload = {
      game_id: this.game_id || '1',
      user_id: this.loginUser.id,
    };

    this.numberPredictionService.endGame(payload).subscribe(
      (response) => {
        if (response?.data) {
          this.openResult(
            response?.data?.game_number,
            response?.data?.result_number,
            response?.data?.amount
          );
          this.showCoin = false;
          this.gameStarted = false;
          this.game_id = '';
          this.enterGameAmount.setValue('');
          this.selectedNumber = ""
          this.walletDetails();
          this.router.navigate(['/game/number-prediction'], {
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
