import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/models/Currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Input() myCurrency!: Currency;
  @Input() isFavorite: boolean = false;
  @Input() isDisabled: any = false;

  @Output() voteEvent = new EventEmitter<string>();
  @Output() unvoteEvent = new EventEmitter<string>();

  constructor() {}

  sendVote() {
    this.voteEvent.emit(this.myCurrency.name);
  }

  sendUnvote() {
    this.unvoteEvent.emit(this.myCurrency.name);
  }
}
