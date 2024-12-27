import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist-chatroom',
  storage: localStorage,
});

const chatroomIdState = atom<string | null>({
  key: 'chatroomIdState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default chatroomIdState;
