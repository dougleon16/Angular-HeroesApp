import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Hero } from './../interfaces/hero.interface';
import { environments } from 'src/environments/environments';
@Injectable({ providedIn: 'root' })
export class HeroService {
  private baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesById(id: string): Observable<Hero | undefined> {
    return this._http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  //CRUD HERO
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    return this._http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this._http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map((resp) => true),
      catchError((error) => of(false))
    );
  }
}
