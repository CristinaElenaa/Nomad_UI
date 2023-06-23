import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListingModel } from '../_models/listing-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListingPageModel } from '../_models/listing-page-model';
import { RegisterListingModel } from '../_models/register-listing-model';
import { CardListingModel } from '../_models/card-listing-model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private url = "Listing";

  constructor(private http: HttpClient) { }

  // public getAllListings(): Observable<ListingModel[]> {
  //   console.log(`${environment.apiUrl}/${this.url}`);
  //   return this.http.get<ListingModel[]>(`${environment.apiUrl}/${this.url}`);

  // }

  public getAllListings(): Observable<CardListingModel[]> {
    console.log(`${environment.apiUrl}/${this.url}`);
    return this.http.get<CardListingModel[]>(`${environment.apiUrl}/${this.url}/${"with-photo"}`);

  }

  public getListing(id: number): Observable<ListingModel> {
    console.log(id);
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<ListingModel>(`${environment.apiUrl}/${this.url}/${"listingById"}`, {
      params: params
    });
  }

  public searchListingByName(listingTitle: string): Observable<CardListingModel[]> {
    console.log(listingTitle);
    let params = new HttpParams();
    params = params.append('listingTitle', listingTitle);

    return this.http.get<CardListingModel[]>(`${environment.apiUrl}/${this.url}/${"search"}`, {
      params: params
    });
  }

  public searchListingByFilters(listingCity: string, dates: Date[], capacity: number)
    : Observable<CardListingModel[]> {
    const stringDates = this.getDatesOnly(dates);
    console.log(stringDates);
    let params = new HttpParams();
    params = params.append('listingCity', listingCity);
    params = params.append('checkInString', stringDates.checkInDate);
    params = params.append('checkOutString', stringDates.checkInDate);
    params = params.append('capacity', capacity);

    return this.http.get<CardListingModel[]>(`${environment.apiUrl}/${this.url}/${"search-filters"}`, {
      params: params
    });
  }

  public getListingsForHost(hostId: number): Observable<CardListingModel[]> {
  let params = new HttpParams();
  params = params.append('hostId', hostId);

  return this.http.get<CardListingModel[]>(`${environment.apiUrl}/${this.url}/${"host-id"}`, {
    params: params
  });
}

public getDatesOnly(dates: Date[]) {
  const checkIn: Date = dates[0];
  const checkOut: Date = dates[1];

  const checkInDate: string = checkIn.toISOString().split("T")[0];
  const checkOutDate: string = checkOut.toISOString().split("T")[0];

  return { checkInDate, checkOutDate };
}

  public postListing(registerListingModel: RegisterListingModel): Observable<any> {
    const formData = new FormData();
    formData.append('photo', registerListingModel.photo[0], registerListingModel.photo[0].name);
    formData.append('name', registerListingModel.name);
    formData.append('description', registerListingModel.description);
    formData.append('number', registerListingModel.number);
    formData.append('street', registerListingModel.street);
    formData.append('city', registerListingModel.city);
    formData.append('county', registerListingModel.county);
    formData.append('country', registerListingModel.country);
    formData.append('postalCode', registerListingModel.postalCode);
    formData.append('capacity', registerListingModel.capacity);
    formData.append('bedroomCount', registerListingModel.bedroomCount);
    formData.append('bedCount', registerListingModel.bedCount);
    formData.append('bathroomCount', registerListingModel.bathroomCount);
    formData.append('hasWiFi', registerListingModel.hasWiFi);
    formData.append('hasTv', registerListingModel.hasTv);
    formData.append('hasParking', registerListingModel.hasParking);
    formData.append('hasAirConditioning', registerListingModel.hasAirConditioning);
    formData.append('price', registerListingModel.price);
    formData.append('hostId', registerListingModel.hostId);
    formData.append('listingType', registerListingModel.listingType);
    formData.append('privacyType', registerListingModel.privacyType);

    return this.http.post(`${environment.apiUrl}/${this.url}/${"addListing"}`, formData);
  }

  public removeListing(listingId: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('listingId', listingId);
  
    return this.http.delete(`${environment.apiUrl}/${this.url}`, {
      params: params
    });
  }


}
