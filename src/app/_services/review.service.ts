import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewModel } from '../_models/review-model';
import { RegisterReviewModel } from '../_models/register-review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private listingUrl = "ListingReview";
  private userUrl = "UserReview";

  constructor(private http: HttpClient) { }

  public getReviewsForListing(id: number): Observable<ReviewModel[]> {
    let params = new HttpParams();
    params = params.append('id', id);
    
    return this.http.get<ReviewModel[]>(`${environment.apiUrl}/${this.listingUrl}/${"get-listing-reviews"}`, {
      params: params}).pipe(
        catchError(() => of([]))
      );
    
  }

  public getReviewsForUser(id: number): Observable<ReviewModel[]> {
    let params = new HttpParams();
    params = params.append('id', id);
    
    return this.http.get<ReviewModel[]>(`${environment.apiUrl}/${this.userUrl}/${"get-user-reviews"}`, {
      params: params}).pipe(
        catchError(() => of([]))
      );
  }

  public postListingReview(listingReview: RegisterReviewModel, listingId: number, bookingId: number){
    let params = new HttpParams();
    params = params.append('listingId', listingId);
    params = params.append('bookingId', bookingId);

    return this.http.post(`${environment.apiUrl}/${this.listingUrl}/${"add-listing-review"}`, listingReview, {
      params: params}).pipe(
        catchError(() => of([]))
      );
  }

  public postUserReview(userReview: RegisterReviewModel, userId: number, bookingId: number){
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('bookingId', bookingId);

    return this.http.post(`${environment.apiUrl}/${this.listingUrl}/${"add-listing-review"}`, userReview, {
      params: params}).pipe(
        catchError(() => of([]))
      );
  }
}
