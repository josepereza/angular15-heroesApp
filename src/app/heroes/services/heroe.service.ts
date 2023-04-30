import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Heroe } from '../interfaces/heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
   baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }

  getAllHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }
  getHeroById(id:string):Observable<Heroe | undefined>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`).
    pipe(
      catchError(error=>of(undefined))
    )

  }
  getSuggestions( query: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  } 
}
