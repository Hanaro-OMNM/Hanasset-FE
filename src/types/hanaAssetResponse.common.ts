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
export interface ChatRoom {
  chatroomId: string;
  userId: number;
  consultantId: number;
  chatroomTitle: string;
  chatroomStatus: string;
  reservedTime: string;
  finishedAt: string | null;
  createdAt: string;
}
export interface ChatMessage {
  messageId: string;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}
export interface GetCompletedChatroomsResponse {
  message: string;
  result: ChatRoom[];
}

export interface GetChatroomMessagesResponse {
  message: string;
  result: ChatMessage[];
}
//기존 메세지 불러오기
export interface CurrentMessages {
  message: string;
  result: {
    chatMessageResponse: ChatMessage[];
  };
}

//대기열
export interface CurrentChatRooms {
  message: string;
  result: {
    chatroomResponse: ChatRoom[];
  };
}
export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}
export interface ChatroomApiResponse {
  data: {
    chatrooms: ChatRoom[];
  };
}
// ApiResponseEntity 타입
export interface ApiResponseEntity<T> {
  success: boolean;
  message: string;
  data: T;
}

// ChatroomResponse 타입
export interface ChatroomResponse {
  totalCount: number;
  rooms: ChatRoomDTO[];
}

// ChatRoomDTO 타입 예시
export interface ChatRoomDTO {
  chatroomId: string;
  userId: number;
  consultantId: number;
  chatroomTitle: string;
  reservedTime: string; // ISO 8601 형식
  chatroomStatus: string;
}
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
  realEstateInfo: RealEstateInfo;
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
export interface UserInfoResponse {
  id: number;
  name: string;
  email: string;
}
