import { Hero } from './../../interfaces/hero.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent {
  @Input()
  public hero!: Hero;

  NgOnInit(): void {
    if (!this.hero) throw new Error('Hero is required');
  }
}
