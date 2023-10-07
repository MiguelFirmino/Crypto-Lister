import { Component, OnInit } from '@angular/core';
import { Currencies } from 'src/app/models/Currencies.model';
import { CurrencyListService } from 'src/app/services/currency-list.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencies: { name: string, votes: number }[] = [];

  constructor(private currencyListService: CurrencyListService) {}

  receiveVote(receivedName: string): void {
    this.currencyListService
    .increaseVote(receivedName).subscribe((results) => {})
  }

  ngOnInit(): void {
    this.currencyListService
    .getAllCurrencies().subscribe((results) => {
      for (let i = 0; i < results.data.length; i++) {
        let currency = results.data[i];

        let receivedName = currency[0];
        let receivedVotes = currency[1];

        let newCurrency = {
          name: receivedName,
          votes: receivedVotes
        };

        this.currencies.push(newCurrency);
      }
    })
  }
}
