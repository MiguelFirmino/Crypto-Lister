import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from '../models/Results.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Results> {
    let url = "https://miguelartioli.pythonanywhere.com/get-currencies";

    return this.http.get<Results>(url);
  }

  increaseVote(currencyName: string): Observable<Results> {
    let url = "https://miguelartioli.pythonanywhere.com/vote/" + currencyName;

    return this.http.put<Results>(url, {});
  }

  decreaseVote(currencyName: string): Observable<Results> {
    let url = "https://miguelartioli.pythonanywhere.com/remove-vote/" + currencyName;

    return this.http.put<Results>(url, {});
  }
}
