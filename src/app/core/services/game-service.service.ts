import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGame } from '../models/EventGame';
import { User } from '../models/User';
import { EventPerson } from '../models/EventPerson';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  private url = 'http://52.1.211.201';
  private authenticade: boolean = false;
  constructor(private _http: HttpClient) { }

  postEventGame(eventGame: EventGame): Observable<any> {
    return this._http.post(`${this.url}/api/event`, eventGame)
  }

  getPersonal(id: number): Observable<any> {
    return this._http.get(`${this.url}/api/personal/${id}`)
  }

  getAllEventsStatus(): Observable<any> {
    return this._http.get(`${this.url}/api/event/end`)
   }

  postEventPerson(eventPerson: EventPerson): Observable<any> {
    return this._http.post(`${this.url}/api/event/addevent`, eventPerson)
  }

  getEventAll(): Observable<any> {
    return this._http.get(`${this.url}/api/event/eventAll`)
  }

  getEventAllStatus(): Observable<any> {
    return this._http.get(`${this.url}/api/event/eventAllStatus`)
  }

  getAllEventsInI(id: number): Observable<any> {
    return this._http.get(`${this.url}/api/event/e/${id}`)
  }

  getEvents(): Observable<any> {
    return this._http.get(`${this.url}/api/event`);
  }

  updateStatusEvent(id: number, status: any): Observable<any> {
    return this._http.put(`${this.url}/api/event/update/${id}`, status); 
  }

  finByName(game: string): Observable<any> {
    return this._http.get(`${this.url}/api/event/find/${game}`)
  }

  finByType_game(type_game: string): Observable<any> {
    return this._http.get(`${this.url}/api/event/findtype/${type_game}`)
  }

  loginUser(user: User): Observable<any> {
    return this._http.post(`${this.url}/api/personal/login`, user)
  }

  register(user: User): Observable<any> {
    return this._http.post(`${this.url}/api/personal`, user)
  }

  deleteEventI(id: number, id_event: number): Observable<any> {
    return this._http.delete(`${this.url}/api/event/delete/${id}/${id_event}`)
  }

  login() {
    this.authenticade = true;
    console.log(this.authenticade)
  }

  logOut() {
    this.authenticade = false;
  }

  isAuthenticade(): boolean {
    return this.authenticade;
  }

  putEventGame(eventgame: EventGame): Observable<any> {
    return this._http.put(`${this.url}`, eventgame);
  }


}
