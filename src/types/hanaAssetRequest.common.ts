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

export interface LoginRequest {
  email: string;
  password: string;
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
export interface ChatCreateRequest {
  userId: number;
  consultantId: number;
  chatroomTitle: string;
  reservedTime: string;
}
export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}
