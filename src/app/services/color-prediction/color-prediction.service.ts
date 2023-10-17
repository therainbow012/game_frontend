import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum ColorPredictionEndPoint {
  GET_GAME = 'game/last_created?type=1',
  CREATE_GAME = 'color_prediction/create',
  END_GAME = 'color_prediction/end_game',
  GAME_HISTORY = 'color_prediction/history',
}

@Injectable({
  providedIn: 'root',
})
export class ColorPredictionService {
  baseUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  // get game
  getGameHistory(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + ColorPredictionEndPoint.GAME_HISTORY
    );
  }

  // get game
  getGameData(): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl + ColorPredictionEndPoint.GET_GAME
    );
  }

  // Function to use for the create game
  createGame(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + ColorPredictionEndPoint.CREATE_GAME,
      payload
    );
  }

  // Function to use for the show game result
  endGame(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + ColorPredictionEndPoint.END_GAME,
      payload
    );
  }
}
