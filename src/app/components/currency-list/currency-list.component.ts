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
      alert("You've already voted for a currency");
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
        let newCurrency = this.createCurrencyObject(results.data);

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
        let newCurrency = this.createCurrencyObject(results.data);

        oldCurrency!.votes = newCurrency.votes; // Update currency on display to match real time data

        this.sortCurrencies();
      });

    this.setFavoriteCurrency();
  }

  createCurrencyObject(currency: any): Currency {
    // Generates object to be properly read by 'currency' component
    // this processing is needed because the database returns tuples,
    // not easily readable.
    // (all of this may be avoided through better backend/db design)
    let [receivedName, receivedVotes, receivedLink, receivedAka] = currency;

    let newCurrency = {
      name: receivedName,
      votes: receivedVotes,
      iconLink: receivedLink,
      aka: receivedAka,
    };

    return newCurrency;
  }

  ngOnInit(): void {
    // Request all currencies and generate 'Currency' objects
    this.currencyListService.getAllCurrencies().subscribe((results) => {
      console.log(results);
      let data = results.data;

      for (let i = 0; i < data.length; i++) {
        let currency = data[i];

        let newCurrency = this.createCurrencyObject(currency);

        this.currencies.push(newCurrency);
      }
    });

    this.favoriteCurrency = localStorage.getItem('favorite-currency');
  }
}
