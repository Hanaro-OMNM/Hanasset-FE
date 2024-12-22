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
