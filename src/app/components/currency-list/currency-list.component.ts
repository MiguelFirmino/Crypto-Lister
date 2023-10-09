import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/models/Results.model';
import { CurrencyListService } from 'src/app/services/currency-list.service';
import { Currency } from 'src/app/models/Currency.model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  currencies: Currency[] = [];
  favoriteCurrency: string | undefined | null;

  constructor(
    private currencyListService: CurrencyListService
  ) {}

  sortCurrencies(): void {
    // Sort current currencies without the need of an API call
    this.currencies = this.currencies.sort((a, b) => b.votes - a.votes);
  }

  setFavoriteCurrency(currency?: string): void {
    this.favoriteCurrency = currency;
    currency
      ? ( localStorage.setItem('favorite-currency', currency) )
      : localStorage.removeItem('favorite-currency');
  }

  // find a way to refactor receiveNote and receiveUnvote functions
  receiveVote(receivedName: string): void {
    // Do not register vote if there is a favorite currency
    if (this.favoriteCurrency) {
      return;
    }

    let oldCurrency = this.currencies.find(
      (currency) => currency.name == receivedName
    );
    this.setFavoriteCurrency(receivedName);

    // Increment votes before API call as to appear that feedback is instant
    oldCurrency!.votes += 1;

    this.currencyListService
      .increaseVote(receivedName)
      .subscribe((results: Results) => {
        let newCurrency = results.data[0];

        console.log(newCurrency);
        oldCurrency!.votes = newCurrency.votes; // Update currency on display to match real time data

        this.sortCurrencies();
      });
  }

  receiveUnvote(receivedName: string): void {
    let oldCurrency = this.currencies.find(
      (currency) => currency.name == receivedName
    );

    // Decrease votes before API call as to appear that feedback is instant
    oldCurrency!.votes -= 1;

    this.currencyListService
      .decreaseVote(receivedName)
      .subscribe((results: Results) => {
        let newCurrency = results.data[0];

        oldCurrency!.votes = newCurrency.votes; // Update currency on display to match real time data

        this.sortCurrencies();
      });

    this.setFavoriteCurrency();
  }

  ngOnInit(): void {
    // Requests all currencies
    this.currencyListService.getAllCurrencies().subscribe((results) => {
      console.log(results);
      let data = results.data;

      for (let i = 0; i < data.length; i++) {
        let currency = data[i];

        let newCurrency = currency;

        this.currencies.push(newCurrency);
      }
    });

    this.favoriteCurrency = localStorage.getItem('favorite-currency');
  }
}
