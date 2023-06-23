import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-prev-next-button-bar',
  templateUrl: './prev-next-button-bar.component.html',
  styleUrls: ['./prev-next-button-bar.component.css']
})
export class PrevNextButtonBarComponent implements OnInit {

  @Input()  prevPageUrl!: string | undefined;
  @Input()  nextPageUrl!: string | undefined;
  @Input()  prevPageText!: string | undefined;
  @Input()  nextPageText!: string | undefined;
  // @Output() sizeChange = new EventEmitter<number>();


  constructor() {

  }

  ngOnInit(): void {
  }



}
