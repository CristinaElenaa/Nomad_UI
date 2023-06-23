import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModComponent } from '../dialog-mod/dialog-mod.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { message: 'Reservation successfull'};
    this.dialog.open(DialogModComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}
