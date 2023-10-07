import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currencies } from '../models/Currencies.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Currencies> {
    let url = "http://localhost:5000/get-currencies";

    return this.http.get<Currencies>(url);
  }

  increaseVote(currencyName: string) {
    let url = "http://localhost:5000/vote/" + currencyName;

    return this.http.put(url, currencyName);
  }
}
