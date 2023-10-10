import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/Currency.model';
import { Results } from '../models/Results.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Results> {
    // let url = "http://localhost:5000/get-currencies";
    let url = "https://miguelartioli.pythonanywhere.com/get-currencies";

    return this.http.get<Results>(url);
  }

  increaseVote(currencyName: string): Observable<Results> {
    // let url = "http://localhost:5000/vote/" + currencyName;
    let url = "https://miguelartioli.pythonanywhere.com/vote/" + currencyName;

    return this.http.put<Results>(url, {});
  }

  decreaseVote(currencyName: string): Observable<Results> {
        // let url = "http://localhost:5000/remove-vote/" + currencyName;
    let url = "https://miguelartioli.pythonanywhere.com/remove-vote/" + currencyName;

    return this.http.put<Results>(url, {});
  }
}
