import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe';
import { HeroeService } from '../../services/heroe.service';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public heroe?: Heroe;

  constructor(
    private heroesService: HeroeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero => {

        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);

        this.heroe = hero;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }

}