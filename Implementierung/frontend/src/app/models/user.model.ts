import {AModel} from "./a-model.model";

export interface User extends AModel {
  name: string;
  email: string;
  verified: boolean;
  token?: string;
  role: ERole;
}

export enum ERole {
  COACH = "coach",
  CLIENT = "client"
}
