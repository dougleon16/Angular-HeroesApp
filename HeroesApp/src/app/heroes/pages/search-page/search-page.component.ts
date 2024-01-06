import { HeroService } from './../../services/hero.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  // TODO: Hacerlo mediante un observable

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private HeroService: HeroService) {}

  searchBox() {
    // Obtener el valor del input
    const value = this.searchInput.value || '';
    // Imprimir el valor
    this.HeroService.getSuggestions(value).subscribe((hero) => {
      this.heroes = hero;
    });
  }
  onselectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
