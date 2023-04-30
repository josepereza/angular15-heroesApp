import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesHeroCardComponent } from './heroes-hero-card.component';

describe('HeroesHeroCardComponent', () => {
  let component: HeroesHeroCardComponent;
  let fixture: ComponentFixture<HeroesHeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesHeroCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesHeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
