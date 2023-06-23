import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ListingModel } from '../_models/listing-model';
import { Router } from '@angular/router';
import {
  Ripple,
  initTE,
} from "tw-elements";
import { CardListingModel } from '../_models/card-listing-model';
import { PageEvent } from '@angular/material/paginator';

initTE({ Ripple });

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listingsList: CardListingModel [] = [];
  isLoading: boolean = true;
  loadingDuration: number = 3000;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent = new PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  constructor(private listingService: ListingService) { 
    
  }

  ngOnInit(): void {
    this.displayAllListings();
  }
  
  public displayAllListings(): void{
    // this.listingService
    // .getAllListings()
    // .subscribe((result: CardListingModel[]) => (this.listingsList = result));
    // console.log(this.listingsList);

    setTimeout(() => {
      this.listingService
      .getAllListings()
      .subscribe((result: CardListingModel[]) => (this.listingsList = result));
      this.isLoading = false;
    }, this.loadingDuration);
  }

}
