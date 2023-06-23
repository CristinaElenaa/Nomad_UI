import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListingModel } from '../_models/listing-model';



@Component({
  selector: 'app-about-listing',
  templateUrl: './about-listing.component.html',
  styleUrls: ['./about-listing.component.css']
})
export class AboutListingComponent implements OnInit {
  homeTypeList: any = ['House', 'Apartment','Boat','Camper'];
  privacyTypeList: any= ['Entire Place', 'Private Room', 'Shared-Room'];
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;


  @Output() privacyType = "";
  @Output() listingType = "";
  @Output() event = new EventEmitter<any>();
  
  constructor() {
    this.prevPageUrl =  "/becomeHost";
    this.nextPageUrl = "/listingLocation";
    this.prevPageText = "Back";
    this.nextPageText = "Next";
  }

  ngOnInit(): void {

  }

  emitData() {
    const data = {
      privacyType: this.privacyType,
      listingType: this.listingType,
    };

    this.event.emit(data);
  }

}
