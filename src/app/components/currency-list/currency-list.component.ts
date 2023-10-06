import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent {
  currencies = [
    { name: "Bitcoin" , votes: 10},
    { name: "Ethereum" , votes: 8},
    { name: "Tether USDt" , votes: 2},
    { name: "BNB" , votes: 3},
    { name: "XRP" , votes: 1}
  ];
}
