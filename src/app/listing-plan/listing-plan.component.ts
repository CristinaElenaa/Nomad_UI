import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listing-plan',
  templateUrl: './listing-plan.component.html',
  styleUrls: ['./listing-plan.component.css']
})
export class ListingPlanComponent implements OnInit {
  guestsQuantity = 1;
  bedroomsQuantity = 1;
  bedsQuantity = 1;
  bathroomsQuantity = 1;
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  @Output() event = new EventEmitter<any>();
  @Output() planChanged: EventEmitter<any> = new EventEmitter<any>();
 

  incrementGuestsQuantity() {
    this.guestsQuantity++;
    // this.planChanged.emit(this.guestsQuantity);
    this.emitData();
  }

  incrementBedroomsQuantity() {
    this.bedroomsQuantity++;
    // this.planChanged.emit(this.bedroomsQuantity);
    this.emitData();
  }

  incrementBedsQuantity() {
    this.bedsQuantity++;
    // this.planChanged.emit(this.bedsQuantity);
    this.emitData();
  }

  incrementBathroomsQuantity() {
    this.bathroomsQuantity++;
    // this.planChanged.emit(this.bathroomsQuantity);
    this.emitData();
  }

  decrementBedroomsQuantity() {
    if (this.bedroomsQuantity > 1) {
      this.bedroomsQuantity--;
    }
    // this.planChanged.emit(this.bedroomsQuantity);
    this.emitData();
  }

  decrementBedsQuantity() {
    if (this.bedsQuantity > 1) {
      this.bedsQuantity--;
    }
    // this.planChanged.emit(this.bedsQuantity);
    this.emitData();
  }

  decrementBathroomsQuantity() {
    if (this.bathroomsQuantity > 1) {
      this.bathroomsQuantity--;
    }
    // this.planChanged.emit(this.bathroomsQuantity);
    this.emitData();
  }

  decrementGuestsQuantity() {
    if (this.guestsQuantity > 1) {
      this.guestsQuantity--;
    }
    // this.planChanged.emit(this.guestsQuantity);
    this.emitData();
  }

  constructor() { 
    this.prevPageUrl = "/listingLocation";
    this.nextPageUrl = "/listingAmenities";
    this.prevPageText = "Back";
    this.nextPageText = "Next";
  }

  ngOnInit(): void {

  }

  emitData() {
    const data = {
      capacity: this.guestsQuantity,
      bedroomCount: this.bedroomsQuantity,
      bathroomCount: this.bathroomsQuantity,
      bedCount: this.bedsQuantity,

    };
    this.planChanged.emit(data);
  }

}
