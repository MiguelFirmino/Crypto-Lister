import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/models/Results.model';
import { CurrencyListService } from 'src/app/services/currency-list.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  currencies: { name: string; votes: number; iconLink: string }[] = [];

  constructor(private currencyListService: CurrencyListService) {}

  receiveVote(receivedName: string): void {
    this.currencyListService
      .increaseVote(receivedName)
      .subscribe((results: Results) => {
        let data = results.data;

        let updatedCurrency = this.createCurrencyObject(data);

        let oldCurrency = this.currencies.find((currency) =>
          currency.name == updatedCurrency.name);

        console.log(updatedCurrency);
        oldCurrency!.votes = updatedCurrency.votes;
      });
  }

  createCurrencyObject(currency: any) {
    // Generates object to be properly read by 'currency' component
    // this processing is needed because the database returns tuples,
    // not easily readable.
    // All of this may be avoided through better backend/db design.
    let receivedName: string = currency[0]; 
    let receivedVotes: number = currency[1];
    let receivedLink: string = currency[2];

    let newCurrency = {
      name: receivedName,
      votes: receivedVotes,
      iconLink: receivedLink,
    };

    return newCurrency;
  }

  ngOnInit(): void {
    this.currencyListService.getAllCurrencies().subscribe((results) => {
      console.log(results);
      let data = results.data;

      for (let i = 0; i < data.length; i++) {
        let currency = data[i];

        let newCurrency = this.createCurrencyObject(currency);

        this.currencies.push(newCurrency);
      }
    });
  }
}
