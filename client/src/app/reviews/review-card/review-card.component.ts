import { Component } from '@angular/core';
import { Review } from '../review';
import { Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() review!: Review;
}
