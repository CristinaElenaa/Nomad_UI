import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";
import { SearchModalComponent } from '../search-modal/search-modal.component';

initTE({ Collapse, Ripple });


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  showInput: boolean;
  showCalendar: boolean;
  showQuantityButton: boolean;
  modalOpen = false;
  public showInpt = false;

  public toggleInput(): void {
    this.showInpt = !this.showInpt;
  }
  constructor(private dialog: MatDialog) {
    this.showInput = false;
    this.showCalendar = false;
    this.showQuantityButton = false;
   }


  ngOnInit() {
    
  }

  openInput(): void{
    this.showInput = true;
    this.showCalendar = false;
    this.showQuantityButton = false;
  }

  openCalendar(): void{
    this.showInput = false;
    this.showCalendar = true;
    this.showQuantityButton = false;
  }

  openQuantityButton(): void{
    this.showInput = false;
    this.showCalendar = false;
    this.showQuantityButton = true;
  }

  openModal() {
    const dialogRef = this.dialog.open(SearchModalComponent, {
      width: '900px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
 
}
