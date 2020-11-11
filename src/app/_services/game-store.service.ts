import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Game, IGame } from '../_models/game';


@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  // tslint:disable-next-line:variable-name
  private readonly _gameSource = new BehaviorSubject<Game>({} as Game);

  readonly game$ = this._gameSource.asObservable();

  constructor() {
    this.game = new Game();
  }

  set game(game: IGame) {
    this._gameSource.next(game);
  }

  // Get last value synchronously.
  getGame(): IGame {
    return this._gameSource.getValue();
  }

  newGame(): IGame {
    const tempGame = this.getGame();
    return {...tempGame, playerNames: [...tempGame.playerNames], playerWins: [...tempGame.playerWins]};
  }

  updateTotalRounds(): void {
    const game = this.getGame();
    const roundsTotal = game.roundsTotal;
    this.game = {...game, roundsTotal: roundsTotal + 1};
  }

  updateWinner(playerSymbol: string): void {
    const newGame = this.newGame();
    newGame.roundsTotal += 1;
    if (playerSymbol === 'X') {
      newGame.playerWins[0] += 1;
    } else if (playerSymbol === 'O') {
      newGame.playerWins[1] += 1;
    }
    this.game = newGame;
  }

  updatePlayerNames(playerNameOne: string, playerNameTwo: string): void {
    const newGame = this.newGame();
    newGame.playerNames = [playerNameOne, playerNameTwo];
    this.game = newGame;
  }

  resetWins(): void {
    const newGame = this.newGame();
    newGame.roundsTotal = 0;
    newGame.playerWins = [0, 0];
    this.game = newGame;
  }
}
