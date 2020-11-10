import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() value: string;
  @Output() clickEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.clickEvent.emit();
  }

}
