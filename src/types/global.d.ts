// global.d.ts
import type { maps } from 'navermaps';

// 네이버 지도 타입을 임포트

export {};

declare global {
  interface Window {
    naver: typeof maps; // naver의 실제 타입으로 설정
  }
}

export type selectedEstateType = {
  id: number;
  name: string;
  detail: string;
  address: string;
};

export type AdditionalEstate = {
  basicInfo: BasicInfo;
  estateKeyInfo: EstateKeyInfo;
  imageInfo: ImageInfo;
  priceInfo: PriceInfo;
  etcInfo: EtcInfo;
  addressInfo: AddressInfo;
  maintenanceInfo: MaintenanceInfo;
  floorPlanInfo: FloorPlanInfo;
  utilityInfo: UtilityInfo;
  brokerInfo: BrokerInfo;
};

export type BasicInfo = {
  gu: string;
  atclNo: string;
  atclNm: string;
  rletTpCd: string;
  tradTpNm: string;
  bildNm: string;
  flrInfo: string;
  prc: number;
  cpNm: string;
  cortarNo: string;
  lat: number;
  lng: number;
};

export type EstateKeyInfo = {
  key: {
    complexNumber: number;
    pyeongTypeNumber: number;
    buildingNumber: number;
    hoNumber: number;
    redevelopmentAreaNumber: number | null;
    pnu: number | null;
  };
  type: {
    realEstateType: string;
    tradeType: string;
  };
  address: {
    legalDivisionNumber: string;
    jibun: num;
    li: num;
  };
  isRealEstateAssociationArticle: boolean;
  isArticleImageExist: boolean;
};

export type ImageInfo = {
  state: {
    data: {
      isSuccess: boolean;
      detailCode: string;
      message: string;
      result: any;
    };
    dataUpdateCount: number;
    dataUpdatedAt: number;
    error: null | string;
    errorUpdateCount: number;
    errorUpdatedAt: number;
    fetchFailureCount: number;
    fetchFailureReason: null | string;
    fetchMeta: null | string;
    isInvalidated: boolean;
    status: string;
    fetchStatus: string;
  };
  queryKey: [
    {
      url: string;
      method: string;
      params: {
        articleId: string;
      };
    },
  ];
  queryHash: string;
};

export type PriceInfo = {
  priceInfo: {
    tradeType: string;
    warrantyAmount: number;
    rentAmount: number;
    loan: number;
    loanCode: number | null;
    loanTypeCode: number | null;
  };
  detailInfo: {
    facilityInfo: {
      life: Array;
      security: Array;
      etc: Array;
      buildingConjunctionDateType: string | null;
      buildingConjunctionDate: null;
      approvalElapsedYear: null;
      entranceType: string | null;
      heatingAndCoolingSystemType: string | null;
      heatingEnergyType: string | null;
      totalParkingCount: number;
      parkingCountPerHousehold: number;
      structure: string | null;
      householdNumber: number | null;
    };
    articleDetailInfo: {
      articleNumber: string;
      articleName: string;
      nonComplexBuildingName: string | null;
      nonComplexBuildingSubName: string | null;
      articleFeatureDescription: string;
      articleDescription: string | null;
      isAddressExposed: boolean;
      isJibunAddressExposed: string | null;
      isDirectTrade: boolean;
      directTradeOwnerCellPhoneNumber: string | null;
      buildingType: string | null;
      cpId: string;
      exposureStartDate: string;
      buildingUse: string;
      buildingPrincipalUse: string | null;
    };
    movingInInfo: {
      movingInNegotiation: boolean;
      movingInDate: string | null;
      movingInMonth: string | null;
      movingInType: string;
      contractPeriod: string | null;
    };
    verificationInfo: {
      verificationType: string;
      isAssociationArticle: boolean;
      exposureStartDate: string;
    };
    spaceInfo: {
      floorInfo: {
        targetFloor: string;
        totalFloor: string;
        groundTotalFloor: string;
        undergroundTotalFloor: string;
        floorType: string;
        residenceType: string;
      };
      roomCount: number;
      bathRoomCount: number;
      direction: string;
      duplex: boolean;
      directionStandard: string;
    };
    sizeInfo: {
      supplySpace: number;
      exclusiveSpace: number;
      supplySpaceName: string;
      exclusiveSpaceName: string;
      floorAreaRatio: string | null;
      buildingCoverageRatio: string | null;
      pyeongArea: number;
    };
  };
  communalComplexInfo: {
    complexNumber: number;
    complexName: string;
    pyeongTypeNumber: number;
    dongName: string;
  };
};

export type EtcInfo = {
  typeCode: string;
  criteriaType: string;
  etcDetail: {
    type: string;
    typeDirectInput: string | null;
    categoryList: string[] | number[] | null;
    amount: number;
  };
};

export type AddressInfo = {
  name: string;
  type: string;
  address: Address;
  coordinates: {
    xcoordinate: number;
    ycoordinate: number;
  };
  photos: Photo[];
  totalHouseholdNumber: number;
  leaseHouseholdNumber: number;
  dongCount: number;
  hasBuildingHoInfo: boolean;
  constructionCompany: string;
  buildingUse: string;
  isServicedResidence: boolean;
  buildingRatioInfo: {
    floorAreaRatio: number;
    buildingCoverageRatio: number;
  };
  useApprovalDate: string;
  approvalElapsedYear: number;
  parkingInfo: {
    totalParkingCount: number;
    parkingCountPerHousehold: number;
  };
  heatingAndCoolingInfo: {
    heatingAndCoolingSystemType: string;
    heatingEnergyType: string;
  };
  managementOfficeContact: string;
  monopolyRestrictionType: string;
  isRestrictedTransferOfReconstructionAssociationMembership: boolean;
  isComplexTourExist: boolean;
};

export type MaintenanceInfo = {
  yearMonth: string;
  yearMonthFee: number;
  monthAverageFee: number;
  summerAverageFee: number;
  winterAverageFee: number;
};

export type FloorPlanInfo = {
  number: number;
  name: string;
  nameType: string;
  floorPlanUrls: {
    BASE?: {
      0: string[];
    };
    EXPN?: {
      OPT1: string[];
    };
  };
  supplyArea: number;
  contractArea: number;
  exclusiveArea: number;
  roomCount: number;
  bathRoomCount: number;
  unitsOfSameArea: number;
  entranceType: string | null;
  direction: string;
  isDuplex: boolean;
  isMonopolyRestricted: boolean;
  monopolyPossibleDate: string | null;
  preSalePrice: string | null;
};

export type UtilityInfo = {
  railList: Rail[];
  jiguList: Array;
};

export type BrokerInfo = {
  brokerageName: string;
  brokerName: string;
  address: string;
  businessRegistrationNumber: string;
  profileImageUrl: string;
  brokerId: string;
  ownerConfirmationSaleCount: number;
  phone: {
    brokerage: string;
    mobile: string;
  };
};
export type Photo = {
  url: stinrg;
  majorCategory: string | null;
  subCategory: string | null;
  category: string | null;
  comment: string | null;
  coordinates: {
    xcoordinate: number;
    ycoordinate: number;
  } | null;
};

export type Address = {
  legalDivisionNumber: string;
  legalDivisionLevel: string;
  legalDivision: string;
  city: string;
  division: string;
  sector: string;
  jibun: string;
  roadName: string;
  zipCode: string;
};

export type Rail = {
  stationId: number;
  stationName: string;
  railId: number;
  railName: string;
  openDate: string;
  coordinates: {
    xcoordinate: number;
    ycoordinate: number;
  };
  distance: number;
  walkingTime: number;
};
