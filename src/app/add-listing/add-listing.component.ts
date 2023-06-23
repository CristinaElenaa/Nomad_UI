import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { DialogModComponent } from '../dialog-mod/dialog-mod.component';
import { ListingService } from '../_services/listing.service';
import { RegisterListingModel } from '../_models/register-listing-model';
import { AccountService } from '../_services/account.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { add } from 'ngx-bootstrap/chronos';



@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  userInput = new RegisterListingModel();
  hostId = 0;
  sharedData: any;
  progress = 0;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 5;
  firstFormGroup! :FormGroup;
  secondFormGroup!: FormGroup ;
  isEditable = false;
  photo: File | undefined;


  constructor(public dialog: MatDialog, private router: Router, private listingService: ListingService,
    public accountService: AccountService, private _formBuilder: FormBuilder) {

  }


  ngOnInit(): void {
 
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  

    this.getHostId().subscribe(hostId => {
      console.log('Host ID:', hostId);
      this.hostId = hostId;
    });

  }


  countChangedHandler(count: number) {
    this.userInput.price = count.toString()
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

  photosChangedHandler(photo: File[]){//any
    console.log(photo);
    this.userInput.photo = photo;
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
      hostId: this.hostId.toString(),
      photo: this.sharedData.photo
    };

    console.log(this.userInput);
    this.value+= 30;
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

  public postListing(): void {
    console.log(this.userInput);
    this.listingService.postListing(this.userInput).subscribe(
      (response) => {
        console.log('Listing posted successfully:', response);
      },
      (error) => {
        console.error('An error occurred while posting the listing:', error);
      }
    );
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { message: 'The listing was published' };
    this.dialog.open(DialogModComponent, dialogConfig);
  }

}
