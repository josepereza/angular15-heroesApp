import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  heroes:Heroe[]=[]
  constructor(private heroesService:HeroeService){}
  ngOnInit(): void {
   this.heroesService.getAllHeroes().subscribe(data=>{
    this.heroes=data
   })
  }

}
