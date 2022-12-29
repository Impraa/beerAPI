import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {}

  getData():Observable<any>{
    return this.http.get("https://api.punkapi.com/v2/beers?per_page=25");
  }
}