import { Component } from '@angular/core';
import { Publisher } from '../../interfaces/heroe';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroe'
@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
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
constructor(private heroService:HeroeService){



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
