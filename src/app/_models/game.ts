export interface IGame {
  playerNames?: Array<string>;
  playerWins?: Array<number>;
  roundsTotal?: number;
}


export class Game implements IGame {
  public playerNames?: Array<string>;
  public playerWins?: Array<number>;
  public roundsTotal?: number;
  constructor(params: IGame = {} as IGame) {
    const {
      playerNames = ['Player_1', 'Player_2'],
      playerWins = [0, 0],
      roundsTotal = 0,
    } = params;

    this.playerNames = playerNames;
    this.playerWins = playerWins;
    this.roundsTotal = roundsTotal;
  }
}
