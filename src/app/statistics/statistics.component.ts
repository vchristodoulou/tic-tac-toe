import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { GameStoreService } from '../_services/game-store.service';
import { IGame } from '../_models/game';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  gameSub: Subscription;
  game: IGame;

  constructor(private gameStoreService: GameStoreService) {}

  ngOnInit(): void {
    this.gameSub = this.gameStoreService.game$
      .subscribe(res => {
        this.game = res;
      });
  }
}
