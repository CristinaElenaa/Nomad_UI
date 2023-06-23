import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listing-location',
  templateUrl: './listing-location.component.html',
  styleUrls: ['./listing-location.component.css']
})
export class ListingLocationComponent implements OnInit {
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  
  street = "";
  number = "";
  city = "";
  county = "";
  country = "";
  postalCode = "";
  @Output() event = new EventEmitter<any>();
  @Output() addressChanged = new EventEmitter<any>();

  constructor() {
    this.prevPageUrl = "/aboutListing";
    this.nextPageUrl = "/listingPlan";
    this.prevPageText = "Back";
    this.nextPageText = "Next";
    
   }

  ngOnInit(): void {

  }

  emitData() {
    const data = {
      street: this.street,
      number: this.number,
      city: this.city,
      county: this.county,
      country: this.country,
      postalCode: this.postalCode
    };
    this.addressChanged.emit(data);

  }

}
