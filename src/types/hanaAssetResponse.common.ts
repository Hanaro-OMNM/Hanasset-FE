export interface CurrentMarkers {
  message: string;
  result: {
    currentMarkers: {
      cityName: string;
      cortarNo: number;
      emdName: string;
      sigunguName: string;
    };
    markerInfos: markerInfos[];
  };
}

export interface markerInfos {
  centerLat: number;
  centerLng: number;
  cortarNoCode: number;
  name: string;
}
