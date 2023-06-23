import { Component, OnInit } from '@angular/core';
import { ReviewModel } from '../_models/review-model';
import { RegisterReviewModel } from '../_models/register-review-model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ReviewService } from '../_services/review.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  listingReview = new RegisterReviewModel();
  userReview = new RegisterReviewModel();
  listingId = 0;
  bookingId = 0;
  hostId = 0;
  loggedUserId = 0;

  constructor(private accountService: AccountService, private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserId().subscribe(userId => {
      this.loggedUserId = userId;
      console.log(userId);
    });

    this.route.queryParams.subscribe(params => {
      this.listingId = +params['listingId'];
      this.bookingId = +params['bookingId'];
      this.hostId = +params['hostId'];
      console.log('Listing ID:', this.listingId);
      console.log('Booking ID:', this.bookingId);
      console.log('Host ID:', this.hostId);
    });

  }

  public getUserId(): Observable<number> {
    return this.accountService.getCurrentUserId().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return -1;
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  public postListingReview(formValue: any, listingId: number, bookingId: number) {
    // console.log(listingReview, listingId, bookingId);
    const listingReview = new RegisterReviewModel () ;
    listingReview.rating = formValue.rating;
    listingReview.content = formValue.content;
    listingReview.authorId = this.loggedUserId;
    console.log(listingReview, listingId, bookingId);
    this.reviewService.postListingReview(listingReview, listingId, bookingId).subscribe(
      (response) => {
        console.log('Listing Review posted successfully:', response);
      },
      (error) => {
        console.error('An error occurred while posting the listing:', error);
      }
    );
  }

  public postUserReview(formValue: any, hostId: number, bookingId: number) {
    const userReview = new RegisterReviewModel () ;
    userReview.rating = formValue.rating;
    userReview.content = formValue.content;
    userReview.authorId = this.loggedUserId;
    console.log(userReview, hostId, bookingId);
    this.reviewService.postListingReview(userReview, hostId, bookingId).subscribe(
      (response) => {
        console.log('User Review posted successfully:', response);
      },
      (error) => {
        console.error('An error occurred while posting the listing:', error);
      }
    );
  }

}
