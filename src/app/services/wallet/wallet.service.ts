import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum WalletWithdrawEndPoint {
  WALLET_HISTORY = 'payment/history',
  DEBIT_HISTORY = 'withdraw/history',
  DEBIT_AMOUNT = 'withdraw/add',
  ADD_WALLET = 'wallet/add',
  GET_ACCOUNT = 'user/admin_account',
  WALLET_DETAILS = "wallet/detail"
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  baseUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // Function to use for the get waller history
  walletHistory(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + WalletWithdrawEndPoint.WALLET_HISTORY
    );
  }

  // get wallet details
  getWallet(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + WalletWithdrawEndPoint.WALLET_DETAILS
    );
  }

  // Function to use for the get widraw money history
  debitAmountHistory(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + WalletWithdrawEndPoint.DEBIT_HISTORY
    );
  }

  // Function to use for the add money in the wallet
  addMoney(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + WalletWithdrawEndPoint.ADD_WALLET,
      payload
    );
  }

  // Function to use for the debit money from the wallet
  debitMoney(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + WalletWithdrawEndPoint.DEBIT_AMOUNT,
      payload
    );
  }

  // Function to use for the get waller history
  getAccount(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + WalletWithdrawEndPoint.GET_ACCOUNT
    );
  }
}
