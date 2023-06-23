import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewModel } from '../_models/review-model';
import { ReviewService } from '../_services/review.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnChanges  {
  @Input() id = 0 ;
  userReviews: ReviewModel[] = [];
  // userReviews: ReviewModel[] | number = 0;
  isReviewed = false;
  routeSubscription = new Subscription();

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit(): void {

    this.getUserReviews(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.getUserReviews(changes['id'].currentValue);
    }
  }
  
  // public getUserReviews(id: number): void{
  //   this.reviewService
  //   .getReviewsForUser(id)
  //   .subscribe((result: ReviewModel[]) =>(this.userReviews = result));
  // }

  public getUserReviews(id: number): void {
    this.reviewService.getReviewsForUser(id).subscribe(
      (result: ReviewModel[]) => {
        this.userReviews = result;
        
        if (this.userReviews.length === undefined) {
          this.isReviewed = false;
          console.log('No reviews found for user.');
        } else {
          this.isReviewed = true;
          console.log('Reviews found for user:', this.userReviews);
          console.log(this.userReviews.length);
        }
      },
      error => {
        console.error('An error occurred:', error);
        this.isReviewed = false;
      }
    );
  }

  reloadComponent(userId: number): void {
    this.router.navigate(['/profile', userId]);
  }

}
