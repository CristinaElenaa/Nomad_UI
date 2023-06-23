import { Component, Input, OnInit } from '@angular/core';
import { ListingModel } from '../_models/listing-model';
import { ListingService } from '../_services/listing.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from '../_models/review-model';
import { ReviewService } from '../_services/review.service';
import { RegisterBookingModel } from '../_models/register-booking-model';
import { BookingService } from '../_services/booking.service';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { Alert, initTE } from "tw-elements";
import "tw-elements";
import { DatePipe } from '@angular/common';
initTE({ Alert });

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  listing: ListingModel | null;
  listingReviews: ReviewModel[] = [];
  isReviewed = false;
  occupiedDates: Date[] = [];
  booking = new RegisterBookingModel();
  userId = 0;
  id: number;
  numberOfGuests: number;
  minDateFirstDatepicker: Date;
  bsValue: Date;
  address = '';


  constructor(private listingService: ListingService, private route: ActivatedRoute,
    private reviewService: ReviewService, private accountService: AccountService,
    private bookingService: BookingService, private datePipe: DatePipe) {
    this.listing = new ListingModel();
    this.id = 0;
    this.minDateFirstDatepicker = new Date;
    this.bsValue = new Date;
    this.numberOfGuests = 1;
    this.minDateFirstDatepicker.setDate(this.minDateFirstDatepicker.getDate());
    this.bsValue.setDate(this.minDateFirstDatepicker.getDate() + 1);

  }

  openMap(event: Event) {
    event.preventDefault();
    const encodedAddress = encodeURIComponent(this.address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapUrl, '_blank');
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });


    forkJoin({
      listing: this.displayListing(this.id),

    }).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return of({ listing: null });
      })
    ).subscribe(data => {
      this.listing = data.listing;
      console.log(this.listing);
      this.address = this.listing ? `${this.listing.street} ${this.listing.number}, ${this.listing.city}, ${this.listing.county}, ${this.listing.country}` : '';
    });

    this.getUserId().subscribe(userId => {
      this.userId = userId;
    });

    this.getListingReviews(this.id);
    this.getOccupiedDates(this.id);

  }

  public displayListing(id: number): Observable<ListingModel> {
    return this.listingService.getListing(id);
  }

  public getListingReviews(id: number) {
    this.reviewService.getReviewsForListing(id).subscribe(
      reviews => {
        if (reviews.length === 0) {
          this.isReviewed = false;
          console.log('No reviews available.');
        } else {
          this.isReviewed = true;
          this.listingReviews = reviews;
          console.log(this.isReviewed);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  getOccupiedDates(listingId: number) {
    return this.bookingService.fetchOccupiedDates(listingId).subscribe(
      (result: Date[]) => {
        this.occupiedDates = result.map(date => new Date(date));
      },
      (error: any) => {
        console.error(error);
      })
  }

  getMinCheckOutDate(): Date {
    const checkOutDate = new Date(this.booking.checkIn);
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    return checkOutDate;

  }

  isDateDisabled(date: Date): boolean {
    return this.occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString());
  }

  incrementGuestQuantity() {
    console.log(this.listing!.capacity);
    if (this.booking.numberOfGuests < this.listing!.capacity) {
      this.booking.numberOfGuests++;
    }
  }

  decrementGuestQuantity() {
    if (this.booking.numberOfGuests > 1) {
      this.booking.numberOfGuests--;
    }
  }

  public transformDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
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

  postBooking(): void {
    this.booking.numberOfNightsBooked = this.bookingService.calculateNumberOfNightsBooked(
      this.booking.checkIn, this.booking.checkOut);
    this.booking.listingId = this.listing!.id;
    this.booking.guestId = this.userId;
    this.bookingService.postBooking(this.booking).subscribe(
      (response) => {
        console.log('Booking posted successfully:', response);
      },
      (error) => {
        console.error('An error occurred while posting the booking:', error);
      }
    );
    console.log(this.booking);
  }

  
}
