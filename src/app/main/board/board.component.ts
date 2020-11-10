import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GameStoreService } from '../../_services/game-store.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() xIsNext: boolean;
  @Output() xIsNextChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  squares: string[];
  squaresStyle: Array<{ [key: string]: string}>;
  gameSub: Subscription;

  constructor(private gameStoreService: GameStoreService) { }

  ngOnInit(): void {
    this.squares = Array(9).fill('');
    this.squaresStyle = [
      {'border-width': '0 1px 1px 0'},
      {'border-width': '0 1px 1px 1px'},
      {'border-width': '0 0 1px 1px'},
      {'border-width': '1px 1px 1px 0'},
      {'border-width': '1px 1px 1px 1px'},
      {'border-width': '1px 0 1px 1px'},
      {'border-width': '1px 1px 0 0'},
      {'border-width': '1px 1px 0 1px'},
      {'border-width': '1px 0 0 1px'}
    ];
  }

  handleSquareClick(idx: number): void {
    if (this.squares[idx]) { return; }

    this.squares[idx] = this.xIsNext ? 'X' : 'O';
    const winner = this.calculateWinner();
    if (winner) {
      this.gameStoreService.updateWinner(winner);
      this.squares = Array(9).fill('');
    }
    if (!this.squares.includes('')) {
      this.gameStoreService.updateTotalRounds();
      this.squares = Array(9).fill('');
    }
    this.changePlayerTurn();
  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const item of lines) {
      const [a, b, c] = item;
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return '';
  }

  changePlayerTurn(): void {
    this.xIsNext = !this.xIsNext;
    this.xIsNextChange.emit(this.xIsNext);
  }

}
