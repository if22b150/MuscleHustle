import {AModel} from "./a-model.model";
import {User} from "./user.model";
import {SetModel} from "./set.model";
import {Exercise} from "./exercise.model";

export interface Schedule extends AModel{
  coach: User;
  client: User;
  name: string;
  visible: boolean;
  exercises: {
    exercise: Exercise,
    sets: SetModel[]
  }[];
}
