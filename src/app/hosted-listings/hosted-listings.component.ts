import { Component, OnInit } from '@angular/core';
import { CardListingModel } from '../_models/card-listing-model';
import { ListingService } from '../_services/listing.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModComponent } from '../dialog-mod/dialog-mod.component';
import { WarningModComponent } from '../warning-mod/warning-mod.component';

@Component({
  selector: 'app-hosted-listings',
  templateUrl: './hosted-listings.component.html',
  styleUrls: ['./hosted-listings.component.css']
})
export class HostedListingsComponent implements OnInit {
  hostsListings = true;
  listings: CardListingModel[] = [];
  userId = 0;


  constructor(private listingService: ListingService, private accountService: AccountService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserId().subscribe(userId => {
      this.userId = userId;
    });

    this.loadListings();
  }

  loadListings() {
    this.listingService
      .getListingsForHost(this.userId)
      .subscribe(
        (result: CardListingModel[]) => {
          this.listings = result;
          if (this.listings.length == 0)
            this.hostsListings = false;
          console.log(this.listings);

        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  public getUserId(): Observable<number> {
    return this.accountService.getCurrentUserId().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return -1;
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  public removeListing(listingId: number){
    this.listingService
    .removeListing(listingId)
    .subscribe(
      (result) => {
        console.log("Listing was removed!");

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openWarningMod(listingId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { message: 'Are you sure you want to permanently remove this listing?' };
    
    const dialogRef = this.dialog.open(WarningModComponent, dialogConfig);
    
    dialogRef.componentInstance.confirmAction.subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('Action confirmed!');
        this.removeListing(listingId);

      } else {
        console.log('Action not confirmed!');
      }
    });
  }
  

}
