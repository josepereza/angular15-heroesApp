import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe';
import { HeroeService } from '../../services/heroe.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Heroe[] = [];
  public heroe?: Heroe;

  constructor( private heroesService: HeroeService, private router:Router ){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
      .subscribe( (heroes:any) => this.heroes = heroes );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.heroe = undefined;
      return;
    }

    const hero: Heroe = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.heroe! = hero;

  }
  goBack(){
this.router.navigate(['heroes/list'])
  }


}