import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mod',
  templateUrl: './dialog-mod.component.html',
  styleUrls: ['./dialog-mod.component.css']
})
export class DialogModComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {

  }

  ngOnInit(): void {
  }

}
