import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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

  addHero(hero:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, hero);

  }

  updateHero(hero:Heroe):Observable<Heroe>{
if (!hero.id)  throw Error('Hero is required')

    return this.http.patch<Heroe>(`${ this.baseUrl }/heroes/${hero.id}`, hero);

  }
  deleteHeroById(id:string):Observable<boolean>{
    
        return this.http.delete<boolean>(`${ this.baseUrl }/heroes/${id}`)
        .pipe(
          catchError(err=>of(false)),
          map(res=>true)
        )
    
      }
}
