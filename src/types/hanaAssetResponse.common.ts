import { RealEstateMarketPriceParamInfo } from './hanaAssetRequest.common.ts';

export interface CurrentAreaMarkers {
  message: string;
  result: {
    currentMarkers: {
      cityName: string;
      cortarNo: number;
      emdName: string;
      sigunguName: string;
    };
    markerInfos: areaMarkerInfos[];
  };
}

export interface areaMarkerInfos {
  centerLat: number;
  centerLng: number;
  cortarNoCode: number;
  name: string;
  housingComplexId: number;
}

export interface CurrentAptMarkers {
  message: string;
  result: {
    markerInfos: aptMarkerInfos[];
  };
}

export interface aptMarkerInfos {
  housingComplexId: number;
  name: string;
  centerLat: number;
  centerLng: number;
}

export interface RealEstatePreview {
  realEstateId: number;
  imgUrl: string;
  type: string;
  rentType: string;
  name: string;
  addressDetail: string;
  floor: string;
  deposit: number;
  price: number;
  description: string;
}

export interface RealEstateTypeInfo {
  name: string;
  supplyAreaSize: number;
  exclusiveAreaSize: number;
  managementFee: number;
  roomCount: number;
  bathroomCount: number;
  floorPlanImgUrl: string;
  floorPlanLink: string;
}

export interface RealEstateDetailInfo {
  unitCount: number;
  entranceType: string;
  floorInfo: {
    total: number;
    target: number;
  };
  directionInfo: {
    standard: string;
    facing: string;
  };
}

export interface RealEstateBasicInfo {
  address: string;
  unitCount: number;
  parkingCount: number;
  establishedDate: string;
  dongCount: number;
  heatingAndCoolingInfo: {
    systemType: string;
    energyType: string;
  };
  buildingRatioInfo: {
    floorAreaRatio: number;
    buildingCoverageRatio: number;
  };
  constructionCompany: string;
}

export interface RealEstateList {
  message: string;
  result: {
    count: number;
    realEstates: RealEstatePreview[];
  };
}

export interface RealEstateType {
  message: string;
  result: RealEstateTypeInfo;
}

export interface RealEstateDetail {
  message: string;
  result: RealEstateDetailInfo;
}

export interface RealEstateBasic {
  message: string;
  result: RealEstateBasicInfo;
}

export interface RealEstateMarketPriceParam {
  message: string;
  result: RealEstateMarketPriceParamInfo;
}

export interface RealEstateMarketPrice {
  isSuccess: boolean;
  detailCode: string;
  message: string;
  result: {
    list: TradeInfo[];
  };
}

export interface TradeInfo {
  tradeDate: string;
  tradeYear: string;
  floor: number;
  dealPrice: number | null;
  deposit: number;
  monthlyRent: number;
  deleteDate: string | null;
  isDelete: boolean;
  tradeCategory: string | null;
  registrationDate: string | null;
}

// 대출 추천
export interface LoanRecommend {
  message: string;
  result: {
    user: GuestInfo;
    loanRecommendInfos: LoanRecommendInfo[];
  };
}

export interface GuestInfo {
  name: string;
  age: number;
  jobType: string;
  income: number;
  capital: number;
  hasHouse: boolean;
  annualInterest: number;
  annualPrinciple: number;
  dsr: number;
}

export interface LoanRecommendInfo {
  realEstate: RealEstateInfo;
  hanaLoans: LoanInfo[];
  beotimmokLoans: LoanInfo[];
}

export interface RealEstateInfo {
  realEstateId: number;
  name: string;
  rentType: string;
  deposit: number;
  address: string;
  addressDetail: string;
  exclusiveAreaSize: number;
}

export interface LoanInfo {
  loanId: number;
  name: string;
  rate: number;
  limitAmount: number;
  dsr: number;
}

export interface LoanDetail {
  message: string;
  result: LoanDetailInfo;
}

export interface LoanDetailInfo {
  loanId: number;
  type: string;
  name: string;
  outline: string;
  limitAmount: number;
  rate: number;
  feature: string;
  targetGuest: string;
  targetHouse: string;
  period: string;
  paybackMethod: string;
  dsr: number;
}
