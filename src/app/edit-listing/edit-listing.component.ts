import { Component, OnInit } from '@angular/core';
import { ListingModel } from '../_models/listing-model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateListingModel } from '../_models/update-listing-model';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  userInput =  new UpdateListingModel();
  userId = 0;
  hostId = 0;
  sharedData: any;

  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getHostId().subscribe(hostId => {
      console.log('Host ID:', hostId);
      this.hostId = hostId;
    });

  }


  countChangedHandler(count: number) {
    this.userInput.price = count
  }

  contentChangeHandler(content: string[]){
    this.userInput.name = content[0];
    this.userInput.description = content[1];

  }

  amenitiesChangedHandler(amenities: any){
    this.userInput.hasWiFi = amenities.hasWiFi;
    this.userInput.hasAirConditioning = amenities.hasAirConditioning;
    this.userInput.hasParking = amenities.hasParking
    this.userInput.hasTv = amenities.hasTv;
  }

  planChangedHandler(plan: any){
    this.userInput.bathroomCount = plan.bathroomCount;
    this.userInput.bedCount = plan.bedCount;
    this.userInput.bedroomCount = plan.bedroomCount;
    this.userInput.capacity = plan.capacity;
  }

  addressChangedHandler(address: any){
    this.userInput.street = address.street;
    this.userInput.number = address.number;
    this.userInput.postalCode = address.postalCode;
    this.userInput.city = address.city;
    this.userInput.county = address.county;
    this.userInput.country = address.country;
  }

  photosChangedHandler(photo: File[]){
    console.log(photo);
    // this.userInput.photos = photo;
    // this.photo = photo;
    
  }
  
  

  handleData(data: any) {
    this.sharedData = { ...this.sharedData, ...data };

    this.userInput = {
      privacyType: this.sharedData.privacyType,
      listingType: this.sharedData.listingType,
      street: this.sharedData.street,
      number: this.sharedData.number,
      city: this.sharedData.city,
      country: this.sharedData.country,
      county: this.sharedData.county,
      postalCode: this.sharedData.postalCode,
      capacity: this.sharedData.capacity,
      bedroomCount: this.sharedData.bedroomCount,
      bathroomCount: this.sharedData.bathroomCount,
      bedCount: this.sharedData.bedCount,
      hasWiFi: this.sharedData.hasWiFi,
      hasTv: this.sharedData.hasTv,
      hasParking: this.sharedData.hasParking,
      hasAirConditioning: this.sharedData.hasAirConditioning,
      name: this.sharedData.name,
      description: this.sharedData.description,
      price: this.sharedData.price,
      photoUrl: this.sharedData.photoUrl
      // photos: this.sharedData.photo
    };

    console.log(this.userInput);

  }

  public getHostId(): Observable<number> {
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

  updateListing(){
    console.log(this.userInput);
  }
}
