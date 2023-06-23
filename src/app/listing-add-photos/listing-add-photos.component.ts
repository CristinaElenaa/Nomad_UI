import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listing-add-photos',
  templateUrl: './listing-add-photos.component.html',
  styleUrls: ['./listing-add-photos.component.css']
})
export class ListingAddPhotosComponent implements OnInit {
  srcResult: any;
  imageUrl: any;
  prevPageUrl:  string;
  nextPageUrl: string;
  prevPageText: string;
  nextPageText: string;
  // imageUrl!: string;
  @Output() photosChanged = new EventEmitter<File[]>(); //any
  selectedFiles: File[] = [];



  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      this.emitData();
    }
  }



  constructor() { 
    this.prevPageUrl = "/listingAmenities";
    this.nextPageUrl = "/listingDescription" ;
    this.prevPageText = "Back";
    this.nextPageText = "Next";

  }

  ngOnInit(): void {
  }

  emitData() {
    
    const photoData = { imageUrl: this.imageUrl }; // Example data to emit
    console.log(this.selectedFiles);
    this.photosChanged.emit(this.selectedFiles);
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }


}
