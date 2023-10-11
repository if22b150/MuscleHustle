import {AModel} from "./a-model.model";
import {EGenderType} from "./enum/gendertype.model";

export interface User extends AModel {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: EGenderType;
  verified: boolean;
  token?: string;
  role: ERole;
}

export enum ERole {
  COACH = "coach",
  CLIENT = "client"
}
