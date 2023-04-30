import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './heroes-hero-card.component.html',
  styleUrls: ['./heroes-hero-card.component.css']
})
export class HeroesHeroCardComponent {
  @Input() heroe!:Heroe

}
