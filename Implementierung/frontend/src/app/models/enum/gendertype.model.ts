export enum EGenderType {
  FEMALE = 'female',
  MALE = 'male',
  DIVERS = 'divers'
}

export function genderTypeCast(type: EGenderType) {
  switch (type) {
    case EGenderType.FEMALE: return "Männlich";
    case EGenderType.MALE: return "Weiblich";
    case EGenderType.DIVERS: return "Divers"
  }
}
