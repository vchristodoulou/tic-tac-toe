import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { GameStoreService } from '../_services/game-store.service';
import { IGame } from '../_models/game';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  gameSub: Subscription;
  game: IGame;
  xIsNext: boolean;

  constructor(private gameStoreService: GameStoreService) {}

  ngOnInit(): void {
    this.xIsNext = true;
    this.gameSub = this.gameStoreService.game$
      .subscribe(res => {
        this.game = res;
      });
  }
}
