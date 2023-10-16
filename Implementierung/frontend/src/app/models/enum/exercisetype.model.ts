export enum EExerciseType {
  CARDIO="cardio",
  BODY_WEIGHT= "body_weight",
  WEIGHT= "weight"
}

export function exerciseTypeCast(type: EExerciseType) {
  switch (type) {
    case EExerciseType.BODY_WEIGHT: return "Körpergewicht";
    case EExerciseType.CARDIO: return "Cardio";
    case EExerciseType.WEIGHT: return "Gewicht"
  }
}
