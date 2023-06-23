import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { RegisterBookingModel } from '../_models/register-booking-model';
import { environment } from 'src/environments/environment';
import { ListingModel } from '../_models/listing-model';
import { BookingModel } from '../_models/booking-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = "Booking";

  constructor(private http: HttpClient) { }

  public getBookingByListingId(listingId: number): Observable<BookingModel> {
    console.log(listingId);
    let params = new HttpParams();
    params = params.append('listingId', listingId);
    
    return this.http.get<BookingModel>(`${environment.apiUrl}/${this.url}/${"listingId"}`, {
      params: params});
    
  }

  public fetchOccupiedDates(listingId: number): Observable<Date[]> {
    let params = new HttpParams();
    params = params.append('listingId', listingId);

    return this.http.get<Date[]>(`${environment.apiUrl}/${this.url}/${"occupied-dates"}`,{
      params: params
    }).pipe(
      catchError(() => of([]))
    );
  }

  public calculateNumberOfNightsBooked(checkIn: Date, checkOut: Date): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNightsBooked = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return numberOfNightsBooked;
  }

  public getBookingsForUser(userId: number): Observable<BookingModel[]>{
    let params = new HttpParams();
    params = params.append('userId', userId);
    
    return this.http.get<BookingModel[]>(`${environment.apiUrl}/${this.url}/${"userId"}`, {
      params: params});
  }
  
  public postBooking(booking: RegisterBookingModel) {
    console.log(booking);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.apiUrl}/${this.url}`, booking, { headers })
    .pipe(
      catchError(error => {
        console.error('An error occurred while posting the booking:', error);
        return throwError(error);
      })
    );
  }

}
