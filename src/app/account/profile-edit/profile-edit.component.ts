import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UpdateUserModel } from 'src/app/_models/update-user-model';
import { UserModel } from 'src/app/_models/user-model';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from 'src/app/search-modal/search-modal.component';

import {
  Chip,
  Ripple,
  initTE,
} from "tw-elements";
import { AddPhotoModalComponent } from 'src/app/add-photo-modal/add-photo-modal.component';

initTE({ Chip, Ripple });


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editUserForm') editUserForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editUserForm?.dirty) {
      $event.returnValue = true;
    }
  }
  user: UserModel | null = null;
  member: UpdateUserModel | null = null;
  showModal = false;

  constructor(private accountService: AccountService, private userService: UserService,
    private toastr: ToastrService, private dialog: MatDialog) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })

  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.userService.getUserById(this.user.id).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.userService.updateUser(this.editUserForm?.value, this.user!.id).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editUserForm?.reset(this.member);
      }
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(AddPhotoModalComponent, {
      width: '70%',
    });


    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
