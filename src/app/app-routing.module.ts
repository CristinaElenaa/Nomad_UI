import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutListingComponent } from './about-listing/about-listing.component';
import { BecomeHostComponent } from './become-host/become-host.component';
import { HomeComponent } from './home/home.component';
import { ListingAddPhotosComponent } from './listing-add-photos/listing-add-photos.component';
import { ListingAmenitiesComponent } from './listing-amenities/listing-amenities.component';
import { ListingDescriptionComponent } from './listing-description/listing-description.component';
import { ListingLocationComponent } from './listing-location/listing-location.component';
import { ListingPlanComponent } from './listing-plan/listing-plan.component';
import { ListingPriceComponent } from './listing-price/listing-price.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { UrlHandlingStrategy } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProfileEditComponent } from './account/profile-edit/profile-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { SearchListingComponent } from './search-listing/search-listing.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { HostedListingsComponent } from './hosted-listings/hosted-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: '', 
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'becomeHost', component: BecomeHostComponent},
      { path: 'aboutListing', component: AboutListingComponent},
      { path: 'listingLocation', component: ListingLocationComponent},
      { path: 'listingPlan', component: ListingPlanComponent},
      { path: 'listingAmenities', component: ListingAmenitiesComponent},
      { path: 'listingAddPhotos', component: ListingAddPhotosComponent},
      { path: 'listingDescription', component: ListingDescriptionComponent},
      { path: 'listingPrice', component: ListingPriceComponent},
      { path: 'listing/:id', component: ListingComponent},
      { path: 'checkout', component: CheckoutComponent},
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'bookings', component: BookingsComponent},
      { path: 'addListing', component: AddListingComponent},
      { path: 'not-found', component: NotFoundComponent},
      { path: 'server-error', component: ServerErrorComponent},
      { path: 'search-listing', component: SearchListingComponent},
      { path: 'add-review', component: AddReviewComponent},
      { path: 'hosted-listings', component: HostedListingsComponent},
      { path: 'edit-listing/:id', component: EditListingComponent},
      { path: 'edit/profile', component: ProfileEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
       { path: '**', component: NotFoundComponent, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
