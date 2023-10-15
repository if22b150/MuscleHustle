import {EGenderType} from "./enum/gendertype.model";

export interface Client {
  id: number;
  firstname: string;
  lastname: string;
  gender: EGenderType;
  phone: string;
  email: string;
}
