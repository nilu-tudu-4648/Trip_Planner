import { NAVIGATION } from "./routes";

export const dashboardCards = [
  { name: "Home", navigation: NAVIGATION.DISCOVER },
  { name: "My Favorites", navigation: NAVIGATION.FAVORITES },
  { name: "Start Selling", navigation: NAVIGATION.CREATE_SELLING },
  { name: "My ADS", navigation: NAVIGATION.MY_ADS },
];

export const createSellingdata= {
  type: "",
  Bedroom: "",
  Bathroom: "",
  Furnishing: "",
  BachelorsAllowed: "",
  CarParking: "",
  Listedby: "",
  booked:"false"
}
export const FIRESTORE_COLLECTIONS = {
  All_ROOMS: "allRooms",
  AD_DATA:'ad_data',
  USERS: "users",
};
export const ITEM_KEYS = [
  {key:'Type',value:'Apartments'},
  {key:'Bedrooms',value:'2'},
  {key:'Bathrooms',value:'2'},
  {key:'Furnishing',value:'Furnished'},
  {key:'Construction Status',value:'Ready to Move'},
  {key:'Listed by',value:'Owner'},
  {key:'Car Parking',value:'0'},
  {key:'Facing',value:'East'},
  {key:'Super Builtup area',value:'1050'},
  {key:'Carpet Area (ft)',value:'900'},
  {key:'Maintenance',value:'1200'},
  {key:'Total Floors',value:'4'},
  {key:'Floor No',value:'3'},
  {key:'Project Name',value:'Anand Moyee Tower'},
]
export const SellingTypes=["For Sale:House", "For Rent:House"]
export const types = ["Apartments", "Builder Floors", "Houses & Villas"];
export const furnishingOptions = ["Furnished", "Semi-furnished", "Unfurnished"];
export const bedroomData = ["1", "2", "3", "4", "4+"];
export const BachelorsAllowed = ["No", "Yes"];
export const CarParking = ["1", "2", "3", "4"];
export const Listedby = ["Builder", "Dealer", "Owner"];
