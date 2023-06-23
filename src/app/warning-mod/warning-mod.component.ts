import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-mod',
  templateUrl: './warning-mod.component.html',
  styleUrls: ['./warning-mod.component.css']
})
export class WarningModComponent implements OnInit {
  confirmedAction = false;
  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  ngOnInit(): void {
  }

  onConfirmAction(): void {
    this.confirmedAction = true;
    this.confirmAction.emit(true);
  }

}
