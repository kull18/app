import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private apiKey = '3e170c7c07874835b8bda531c72faab9'
  private apiUrl = 'https://api.rawg.io/api/games'; 

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    })

    return this.httpClient.get(`${this.apiUrl}?key=${this.apiKey}`, {headers})
  }
}
