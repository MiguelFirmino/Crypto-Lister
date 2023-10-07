import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Input() myCurrency!: { name:string, votes:number };

  @Output() voteEvent = new EventEmitter<string>();

  constructor() {}

  sendVote() {
    this.voteEvent.emit(this.myCurrency.name);
  }
}
