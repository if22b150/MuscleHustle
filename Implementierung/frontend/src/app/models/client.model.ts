import {EGenderType} from "./enum/gendertype.model";

export interface Client {
  id: number;
  firstname: string;
  lastname: string;
  gender: EGenderType;
  birthdate: string;
  phoneNumber: string;
  email: string;
  registerDate: string;
  street: string;
  streetNumber: string;
  zip: string;
  country: string;
  countryCode: string;
}
