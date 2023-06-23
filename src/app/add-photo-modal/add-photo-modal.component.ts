import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserModel } from '../_models/user-model';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { PhotoService } from '../_services/photo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-photo-modal',
  templateUrl: './add-photo-modal.component.html',
  styleUrls: ['./add-photo-modal.component.css']
})
export class AddPhotoModalComponent implements OnInit {
  user: UserModel | undefined;
  selectedFiles: File[] = [];

  constructor(private accountService: AccountService, private photoService: PhotoService,
    public dialogRef: MatDialogRef<AddPhotoModalComponent>) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user
      }
    })
  }

  ngOnInit(): void {
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  uploadPhoto(): void {
    console.log(this.user!.id);
    if (this.selectedFiles.length > 0 && this.user) {
      console.log(this.selectedFiles[0]);
      this.photoService.uploadPhoto(this.selectedFiles[0], this.user.id).subscribe(
        photoUrls => {
          console.log('Photos uploaded successfully:', photoUrls);
          console.log(this.user!.id);
        },
        error => {
          console.error('Error uploading photos:', error);
        }
      );
    }
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}





