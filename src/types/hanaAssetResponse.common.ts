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

export interface RealEstateList {
  message: string;
  result: {
    count: number;
    realEstates: RealEstatePreview[];
  };
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
