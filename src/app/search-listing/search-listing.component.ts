import { Component, OnInit } from '@angular/core';
import { CardListingModel } from '../_models/card-listing-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {
  listingData: CardListingModel[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.listingData = JSON.parse(params['listingData']);
      console.log(this.listingData); 
    });
  }

}
