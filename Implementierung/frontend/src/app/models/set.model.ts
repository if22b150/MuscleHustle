import {AModel} from "./a-model.model";

export interface SetModel extends AModel {
  weight?: number;
  reps: number;
  time?: number;
  break?: number;
  rpe: number;
  order: number;
}
