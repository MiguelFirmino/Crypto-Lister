import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/models/Results.model';
import { CurrencyListService } from 'src/app/services/currency-list.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Currency } from 'src/app/models/Currency.model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencies: Currency[] = [];
  favoriteCurrency: string | undefined;

  constructor(private currencyListService: CurrencyListService,
    private localStorageService: LocalStorageService) {}

  sortCurrencies() {
    // Sort current currencies without the need of an API call
    this.currencies = this.currencies.sort((a, b) => b.votes - a.votes);
  }
  
  setFavoriteCurrency(currencyName : string) {
    this.favoriteCurrency = currencyName;
    this.localStorageService.saveData('favorite-currency', currencyName);
  }

  receiveVote(receivedName: string): void {
    // temporary
    // 
    // if (this.favoriteCurrency) {
    //   alert("You've already voted for a currency");
    //   return;
    // }

    let oldCurrency = this.currencies.find((currency) =>
    currency.name == receivedName);

    // Increment votes before API call as to appear that feedback is instant
    oldCurrency!.votes += 1;

    this.currencyListService
      .increaseVote(receivedName)
      .subscribe((results: Results) => {
        let newCurrency = this.createCurrencyObject(results.data);

        oldCurrency!.votes = newCurrency.votes; // Update currency on display to match real time data

        // this.setFavoriteCurrency(receivedName);
        this.sortCurrencies();
      });
  }

  createCurrencyObject(currency: any): Currency {
    // Generates object to be properly read by 'currency' component
    // this processing is needed because the database returns tuples,
    // not easily readable.
    // All of this may be avoided through better backend/db design.
    //let receivedName: string = currency[0]; 
    //let receivedVotes: number = currency[1];
    //let receivedLink: string = currency[2];
    //let receivedAka: string = currency[3];

    let [receivedName, receivedVotes, receivedLink, receivedAka] = currency;

    let newCurrency = {
      name: receivedName,
      votes: receivedVotes,
      iconLink: receivedLink,
      aka: receivedAka
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
