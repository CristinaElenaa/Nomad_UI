import { ListingPhotoModel } from "./listing-photo-model";

export class ListingModel{
    id = 0;
    name = "";
    description = "";
    number = "";
    street = "";
    city = "";
    county = "";
    country = "";
    postalCode = "";
    capacity = 0;
    bedroomCount = "";
    bathroomCount = "";
    bedCount = "";
    hasWiFi = "";
    hasTv = "";
    hasParking = "";
    hasAirConditioning = "";
    price = "";
    hostFirstName = "";
    hostLastName = "";
    // hostEmail = "";
    hostId = 0;
    hostMainPhotoUrl = "";
    listingType = "";
    privacyType = "";
    totalRating = 0;
    photos : ListingPhotoModel[] = [];

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
          this.number = data.number,
          this.street = data.street,
          this.city = data.city,
          this.county = data.county
          this.country = data.country
          this.postalCode = data.postalCode;
          this.capacity = data.capacity
          this.bedroomCount = data.bedroomCount;
          this.bathroomCount = data.bathroomCount;
          this.bedCount = data.bedCount;
          this.hasWiFi = data.hasWiFi
          this.hasTv = data.hasTv;
          this.hasParking = data.hasParking;
          this.hasAirConditioning = data.hasAirConditioning;
          this.price = data.price;
          this. hostFirstName = "abc";
          this. hostLastName = "def";
          // this.hostEmail = "abcc";
          this.listingType = data.listingType;
          this.privacyType = data.privacyType;
          this.totalRating = 0;
          // listingPhotoModels : ListingPhotoModel[] = [];
          // Assign other attributes similarly
        }
      }


}
