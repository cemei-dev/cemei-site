export interface CityEntity {
  id: string;
  cityImageUrl: string;
  name: string;
  managerId: string;
  email: string;
  lat: number;
  lng: number;
  contactEmails: string[];
  contactPhones: string[];
}
