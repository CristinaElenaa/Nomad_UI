import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModComponent } from '../dialog-mod/dialog-mod.component';


@Component({
  selector: 'app-listing-price',
  templateUrl: './listing-price.component.html',
  styleUrls: ['./listing-price.component.css']
})
export class ListingPriceComponent implements OnInit {
  price = 150;
  prevPageUrl: string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  @Output() event = new EventEmitter<any>();
  @Output() formDataChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() priceChangedEvent: EventEmitter<number> = new EventEmitter<number>();

  incrementPrice(): void {
    this.price++;
    this.priceChangedEvent.emit(this.price);
  }

  decrementPrice(): void {
    if (this.price > 1) {
      this.price--;
    }

    this.priceChangedEvent.emit(this.price);
  }

  constructor(public dialog: MatDialog) {
    this.prevPageUrl = "/listingDescription";
    this.nextPageUrl = "/listingPrice";
    this.prevPageText = "Back";
    this.nextPageText = "Done";
  }

  ngOnInit(): void {

  }


  emitData() {
    // const data = {
    //   price: this.price,
    // };
    // this.event.emit(data);
    this.event.emit(this.price);

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { message: 'The listing was published'};
    this.dialog.open(DialogModComponent, dialogConfig);
  }

}
