import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BecomeHostComponent } from './become-host/become-host.component';
import { AboutListingComponent } from './about-listing/about-listing.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ListingLocationComponent } from './listing-location/listing-location.component';
import { ListingPlanComponent } from './listing-plan/listing-plan.component';
import { ListingAmenitiesComponent } from './listing-amenities/listing-amenities.component';
import { ListingAddPhotosComponent } from './listing-add-photos/listing-add-photos.component';
import { ListingDescriptionComponent } from './listing-description/listing-description.component';
import { ListingPriceComponent } from './listing-price/listing-price.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PrevNextButtonBarComponent } from './prev-next-button-bar/prev-next-button-bar.component';
import { ListingComponent } from './listing/listing.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { DialogModComponent } from './dialog-mod/dialog-mod.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { RatingModule } from 'ngx-bootstrap/rating';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReviewCardComponent } from './review-card/review-card.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { BookingsComponent } from './bookings/bookings.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProfileEditComponent } from './account/profile-edit/profile-edit.component';
import { AddPhotoModalComponent } from './add-photo-modal/add-photo-modal.component';
import { SearchListingComponent } from './search-listing/search-listing.component';
import { DatePipe } from '@angular/common';
import { AddReviewComponent } from './add-review/add-review.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HostedListingsComponent } from './hosted-listings/hosted-listings.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { WarningModComponent } from './warning-mod/warning-mod.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchBarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BecomeHostComponent,
    AboutListingComponent,
    ListingLocationComponent,
    ListingPlanComponent,
    ListingAmenitiesComponent,
    ListingAddPhotosComponent,
    ListingDescriptionComponent,
    ListingPriceComponent,
    ImageUploadComponent,
    PrevNextButtonBarComponent,
    ListingComponent,
    CheckoutComponent,
    ProfileComponent,
    MessageComponent,
    DialogModComponent,
    ReviewCardComponent,
    AddListingComponent,
    SearchModalComponent,
    BookingsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProfileEditComponent,
    AddPhotoModalComponent,
    SearchListingComponent,
    AddReviewComponent,
    HostedListingsComponent,
    EditListingComponent,
    TextInputComponent,
    WarningModComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    PaginationModule.forRoot(),
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true},
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
