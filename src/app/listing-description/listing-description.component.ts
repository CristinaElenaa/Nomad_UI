import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listing-description',
  templateUrl: './listing-description.component.html',
  styleUrls: ['./listing-description.component.css']
})
export class ListingDescriptionComponent implements OnInit {
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  name = "";
  description ="";
  @Output() event = new EventEmitter<any>();
  @Output() contentChanged: EventEmitter<string[]> = new EventEmitter()

  constructor() { 
    this.prevPageUrl = "/listingAddPhotos";
    this.nextPageUrl = "/listingPrice";
    this.prevPageText = "Back";
    this.nextPageText = "Next";
  }

  ngOnInit(): void {

  }

  emitData() {
    // const data = {
    //   name: this.name,
    //   description: this.description,
    // };
    // this.event.emit(data);
    const data :  string[] = [];
    data.push(this.name);
    data.push(this.description);

    this.contentChanged.emit(data);
  }

}
