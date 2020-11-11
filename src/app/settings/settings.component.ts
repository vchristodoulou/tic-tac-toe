import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Subscription } from 'rxjs';

import { GameStoreService } from '../_services/game-store.service';
import { IGame } from '../_models/game';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  gameSub: Subscription;
  game: IGame;
  playerNamesForm: FormGroup;
  playerNamesStatus: string;
  resetStatus: string;

  constructor(private formBuilder: FormBuilder,
              private gameStoreService: GameStoreService) {}

  ngOnInit(): void {
    this.playerNamesStatus = '';
    this.resetStatus = '';

    this.gameSub = this.gameStoreService.game$
      .subscribe(res => {
        this.game = res;
      });

    this.playerNamesForm = this.formBuilder.group({
      player1: [this.game.playerNames[0], Validators.required ],
      player2: [this.game.playerNames[1], Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  get f() { return this.playerNamesForm.controls; }

  onNamesSubmit(): void {
    if (this.playerNamesForm.invalid) {
      return;
    }
    this.gameStoreService.updatePlayerNames(this.f.player1.value, this.f.player2.value);
    this.playerNamesStatus = 'SUCCESS';
    setTimeout(() => {
      this.playerNamesStatus = '';
    }, 1500);
  }

  onReset(): void {
    this.gameStoreService.resetWins();
    this.resetStatus = 'SUCCESS';
    setTimeout(() => {
      this.resetStatus = '';
    }, 1500);
  }

}
