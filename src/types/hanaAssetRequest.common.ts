export interface CurrentLocation {
  lat: number;
  lng: number;
  zoom: number;
}

export interface MarkerComplexId {
  housingComplexId: number;
}

export interface ConfirmCode {
  email: string;
  code: number;
}

export interface EmailSignUpRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BirthDate {
  email: string;
  birthDate: Date;
}
