import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// `localStorage`를 사용하여 상태 지속성 설정
const { persistAtom } = recoilPersist({
  key: 'recoil-persist-chatroom', // 저장 키
  storage: localStorage, // 또는 sessionStorage
});

const chatroomIdState = atom<string | null>({
  key: 'chatroomIdState', // Unique ID
  default: null, // Default value
  effects_UNSTABLE: [persistAtom], // persistAtom 효과 추가
});

export default chatroomIdState;
