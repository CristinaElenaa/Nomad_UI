import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListingService } from '../_services/listing.service';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  listingName = "";
  listingCity = "";
  checkIn = new Date();
  checkOut = new Date();
  capacity = 0;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  dates : Date[]=[];

  constructor(public dialogRef: MatDialogRef<SearchModalComponent>,
     private listingService: ListingService, private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
  }

  increaseCapacity() {
    this.capacity++;
  }

  decreaseCapacity() {
    if (this.capacity > 1) {
      this.capacity--;
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  searchListingByName(listingName: string) {
      return this.listingService.searchListingByName(listingName).subscribe(
        (result) => {
          console.log(result); 
          this.closeModal();
          this.router.navigate(['/search-listing'], { queryParams: { listingData: JSON.stringify(result) } });
        },
        (error) => {
          console.error(error); 
        }
      );
  }

  showDates(){
    console.log(this.dates);
  }

  searchListingByFilters(listingCity: string, dates: Date[], capacity: number) {

    return this.listingService.searchListingByFilters(listingCity, dates, capacity).subscribe(
      (result) => {
        console.log(result); 
        this.closeModal();
        this.router.navigate(['/search-listing'], { queryParams: { listingData: JSON.stringify(result) } });
      },
      (error) => {
        console.error(error); 
      }
    );
}
}
