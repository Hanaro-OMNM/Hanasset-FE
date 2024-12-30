export interface CurrentAreaMarkers {
  currentMarkers: {
    cityName: string;
    cortarNo: number;
    emdName: string;
    sigunguName: string;
  };
  markerInfos: areaMarkerInfos[];
}

export interface areaMarkerInfos {
  centerLat: number;
  centerLng: number;
  cortarNoCode: number;
  name: string;
  housingComplexId: number;
}

export interface CurrentAptMarkers {
  markerInfos: aptMarkerInfos[];
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

export interface RealEstateList {
  count: number;
  realEstates: RealEstatePreview[];
}

export interface RealEstateType {
  name: string;
  supplyAreaSize: number;
  exclusiveAreaSize: number;
  managementFee: number;
  roomCount: number;
  bathroomCount: number;
  floorPlanImgUrl: string;
  floorPlanLink: string;
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
  messageType: string;
  chatroomId: string;
  senderId: number;
  content: string;
  accessor: string;
  createdAt: string;
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

export interface ChatHistoryResponse {
  chatMessages: ChatMessage[];
  count: number;
}

//대기열
export interface CurrentChatRooms {
  message: string;
  result: {
    chatroomResponse: ChatRoom[];
  };
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
  data: {
    result: T;
  };
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

export interface RealEstateDetail {
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

export interface RealEstateBasic {
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

// SearchResponse 타입
export interface Search {
  housingComplexId: number;
  complexName: string;
  addressName: string;
  lat: number;
  lng: number;
}

export interface LoanRecommend {
  user: GuestInfo;
  loanRecommendInfos: LoanRecommendInfo[];
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

export interface BookmarkArea {
  areaCodes: BookmarkAreaInfo[];
}

export interface BookmarkAreaInfo {
  areaCodeId: number;
  emdName: string;
  centerLat: number;
  centerLng: number;
}

export interface BookmarkAreaStatus {
  full: boolean;
  emdName: string;
}

export interface UserProperty {
  jobType: string;
  income: number;
  capital: number;
  hasHouse: boolean;
  annualInterest: number;
  annualPrincipal: number;
  isAbnormalHouse: boolean;
  isHousingFraudVictim: boolean;
  stressDsr: number;
}
