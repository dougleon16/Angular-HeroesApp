import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from './../../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroesById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/heroes/lists');
        this.hero = hero;
        return this.hero;
      });
  }

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
