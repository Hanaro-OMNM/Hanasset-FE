import real_estate_1 from '../assets/img/real_estate_1.png';
import real_estate_2 from '../assets/img/real_estate_2.png';
import real_estate_3 from '../assets/img/real_estate_3.png';
import real_estate_4 from '../assets/img/real_estate_4.png';

export const realEstateData = [
  {
    type: '아파트',
    location: '목화',
    price: '24억',
    size: '6층, 73.06m², 관리비 20만',
    description: '매매O 주인직접 O 영구한강조망1..',
    dealType: '매매',
    imageUrl: real_estate_1,
  },
  {
    type: '아파트',
    location: '공작',
    price: '32억',
    size: '8층, 136.53m², 관리비 35만',
    description: '공작38 직접관리 여의나루 역세권..',
    dealType: '매매',
    imageUrl: real_estate_2,
  },
  {
    type: '아파트',
    location: '롯데캐슬아이비(주상복합)',
    price: '32억',
    size: '25층, 191.62m², 관리비 60만',
    description: '아이비61 단독실진행 전세승계조건',
    dealType: '매매',
    imageUrl: real_estate_3,
  },
  {
    type: '아파트',
    location: '서초푸르지오(써밋)',
    price: '32억',
    size: '17층, 100.97m², 관리비 30만',
    description: '갭투자가능',
    dealType: '전세',
    imageUrl: real_estate_4,
  },
];

export const realEstateImages = [
  'src/assets/img/img1.jpg',
  'src/assets/img/img2.jpg',
  'src/assets/img/img3.jpg',
];

export const realEstateTypeInfoData = {
  area: '161Am²',
  areaSize: '95세대',
  supply: '161.26m²/149.59m²',
  rooms: '5',
  bathrooms: '2',
  exclusiveRate: '92.76%',
  managementFee: '452,564',
  floorPlanImage: 'src/assets/img/floor.jpg',
  floorPlanLink:
    'https://land.naver.com/info/groundPlanGallery.naver?rletNo=754&ptpId=4&newComplex=Y', // 네이버부동산 링크
};

export const realEstatePropertyInfoProps = {
  title: '트리마제 102동 중간층',
  rentType: '전세',
  price: '17억',
  description: '아파트 | 95/69m² | 5,884만원/3.3m²',
};

export const realEstatePropertyDetailsProps = {
  propertyNumber: '142573590',
  availableDate: '2024.11.10 이후',
  managementFee: '45만',
  parkingInfo: '총 주차 588대 / 세대당 주차 1대',
  direction: '남서향',
  totalFloors: '12층',
  currentFloor: '3층',
  area: '95세대',
};

export const realEstateMarketSectionProps = {
  sizeInfo: '126Am² / 84.82m²',
  jeonseMarketInfoCardProps: {
    type: '전세',
    price: '23억 6,000',
    date: '24.10.11',
    floor: 36,
    averagePrice: '23억 5,385',
  },
  wolseMarketInfoCardProps: {
    type: '월세',
    price: '10억 / 620',
    date: '24.07.06',
    floor: 30,
  },
};

export const realEstateBasicInfoList = [
  '사용승인일 1976.07.23(49년차)',
  '서울특별시 영등포구 여의도동 32',
  '329세대 / 3개동',
  '주차 1대 / 총 329대',
  '최고 15층',
  '계단식, 복도식(현관구조)',
  '지역난방도시가스',
  '용적률 ~% / 건폐율 ~%',
  '한양주택(건설사)',
  '관리사무소 02-123-1234',
];
