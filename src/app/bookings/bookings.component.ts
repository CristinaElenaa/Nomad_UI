import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { RegisterBookingModel } from '../_models/register-booking-model';
import { BookingModel } from '../_models/booking-model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { DatePipe } from '@angular/common';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  userId = 0;
  bookingsList: BookingModel[] = [];
  hasBookings : boolean | undefined;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<BookingModel>(this.bookingsList);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private bookingService: BookingService, private accountService: AccountService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.getUserId().subscribe(userId => {
      console.log('User ID:', userId);
      this.userId = userId;
    });

    this.getBookings(this.userId).subscribe(bookingsModel => {
      this.bookingsList = bookingsModel;
      if(bookingsModel.length > 0){
        this.hasBookings = true;
        console.log(this.hasBookings);
      }
      else{
        this.hasBookings = false;
      }
    })
  }

  public getBookings(userId: number): Observable<BookingModel[]> {
    return this.bookingService.getBookingsForUser(userId).pipe(
      map(bookingsModel => {
        if (bookingsModel.length>0) {
          this.bookingsList = bookingsModel;
          return bookingsModel;
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
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

  public combineDateParts(date: Date): string {
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  public transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
