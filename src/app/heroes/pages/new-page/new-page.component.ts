import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../interfaces/heroe';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroe'
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{
public heroForm=new FormGroup({
  id:               new FormControl<string>(''),
  superhero:        new FormControl<string>('',{nonNullable:true}),
  publisher:        new FormControl<Publisher>(Publisher.DCComics),
  alter_ego:        new FormControl(''),
  first_appearance: new FormControl(''),
  characters:       new FormControl(''),
  alt_img:          new FormControl(''),

})

public publishers=[
  {id: 'DC Comics', desc: 'DC - Comics'},
  {id: 'Marvel Comics', desc: 'Marvel - Comics'}
]
constructor(
  private heroService:HeroeService,
  private activatedRoute:ActivatedRoute,
  private router:Router
  ){



}
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroService.getHeroById(id)),

    ).subscribe((heroe:any)=>{
      if (!heroe) return  this.router.navigateByUrl('/');
    
      this.heroForm.reset(heroe);
      return
    })
  
  }
get currentHeroe(): Heroe {
  const Heroe=this.heroForm.value as Heroe;
  return Heroe
}
onSubmit():void{
  if(this.heroForm.invalid)return;
  if (this.currentHeroe.id){
    this.heroService.updateHero(this.currentHeroe)
    .subscribe(heroe=>{

    });
    return
  }
  this.heroService.addHero(this.currentHeroe).subscribe(data=>{
    console.log(data)
  })
  
}

}
