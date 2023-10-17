import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum NumberPredictionEndPoint {
  GET_GAME = 'game/last_created?type=2',
  CREATE_GAME = 'number_prediction/create',
  END_GAME = 'number_prediction/end_game',
  GAME_HISTORY = 'number_prediction/history',
}

@Injectable({
  providedIn: 'root',
})
export class NumberPredictionService {
  baseUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // get game
  getGameHistory(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + NumberPredictionEndPoint.GAME_HISTORY
    );
  }

  // get game
  getGameData(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + NumberPredictionEndPoint.GET_GAME
    );
  }

  // Function to use for the create game
  createGame(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + NumberPredictionEndPoint.CREATE_GAME,
      payload
    );
  }

  // Function to use for the show game result
  endGame(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + NumberPredictionEndPoint.END_GAME,
      payload
    );
  }
}
