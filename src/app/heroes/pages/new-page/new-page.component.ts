import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../interfaces/heroe';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroe'
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
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
  private router:Router,
  private snackBar:MatSnackBar,
  public dialog: MatDialog
  ){



}
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroService.getHeroById(id)),

    ).subscribe((heroe)=>{
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
    this.showSnackBar(`${heroe.superhero } updated`)
    });
    return
  }
  this.heroService.addHero(this.currentHeroe).subscribe(heroe=>{
    this.showSnackBar(`${heroe.superhero } saved`)
  })
  
}

showSnackBar(mensaje:string){
  this.snackBar.open(mensaje , 'done',{duration:3400})

}

onDeleteHero() {
  if ( !this.currentHeroe.id ) throw Error('Hero id is required');

  const dialogRef = this.dialog.open( ConfirmDialogComponent, {
    data: this.heroForm.value
  });

  dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.heroService.deleteHeroById( this.currentHeroe.id )),
      filter( (wasDeleted: boolean) => wasDeleted ),
    )
    .subscribe(() => {
      this.router.navigate(['/heroes']);
    });

  // dialogRef.afterClosed().subscribe(result => {
  //   if ( !result ) return;

  //   this.heroesService.deleteHeroById( this.currentHero.id )
  //   .subscribe( wasDeleted => {
  //     if ( wasDeleted )
  //       this.router.navigate(['/heroes']);
  //   })
  // });

}
}

