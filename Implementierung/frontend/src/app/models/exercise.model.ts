import {EExerciseType} from "./enum/exercisetype.model";

export interface Exercise {
  id: number;
  type: EExerciseType;
  name: string;
  description: string;
  videoLink: string;
  muscleGroups: string;
}
