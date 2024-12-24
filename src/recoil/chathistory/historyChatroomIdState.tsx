import { atom } from 'recoil';

export const historyChatroomIdState = atom<string | null>({
  key: 'historyChatroomIdState', // 고유 키
  default: null, // 초기값은 null
});
