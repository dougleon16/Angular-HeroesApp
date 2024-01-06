import { HeroService } from './../../services/hero.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC-Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marver Comics' },
  ];

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  // obtener el id e imprimir los campos en el form de edicion si la url es edit
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.route.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroesById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/']);
        this.heroForm.reset(hero);
        return;
      });
  }
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((heroUpdated) => {
        //TODO: SnackBar
        this.showSnackBar(`${heroUpdated.superhero} updated`);
      });
      return;
    }
    this.heroService.addHero(this.currentHero).subscribe((heroCreated) => {
      //TODO: SNACKBAR y Redirigir /hero/edit/hero.id
      this.router.navigateByUrl(`edit/${heroCreated.id}`);
      this.showSnackBar(`${heroCreated.superhero} updated`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    //TODO: Optimizar este codigo

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.heroService
        .deleteHeroById(this.currentHero.id)
        .subscribe((wasDeleted) => {
          if (wasDeleted) {
            this.router.navigate(['/heroes/list']);
            this.showSnackBar(`${this.currentHero.superhero} deleted`);
          }
        });
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500,
    });
  }
}
