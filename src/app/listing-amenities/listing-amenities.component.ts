import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-listing-amenities',
  templateUrl: './listing-amenities.component.html',
  styleUrls: ['./listing-amenities.component.css']
})
export class ListingAmenitiesComponent implements OnInit {
  amenities: FormGroup;
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  @Output() event = new EventEmitter<any>();
  @Output() amenitiesChanged = new EventEmitter<any>();
 
  
  constructor(fb: FormBuilder) {
    this.prevPageText = "Back";
    this.nextPageText = "Next";
    
    this.amenities = fb.group({
      wifi: false,
      tv: false,
      parking: false,
      airConditioning: false,
    });

    this.prevPageUrl = "/listingPlan";
    this.nextPageUrl = "/listingAddPhotos";

   }

  ngOnInit(): void {
    
  }

  emitData() {
    const data = {
      hasWiFi: this.amenities.value.wifi,
      hasTv: this.amenities.value.tv,
      hasParking: this.amenities.value.parking,
      hasAirConditioning: this.amenities.value.airConditioning,

    };
    // this.event.emit(data);
//  console.log(this.amenities.value);
    this.amenitiesChanged.emit(data);
  }

}
