import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist-chatHistory',
  storage: localStorage,
});
const historyChatroomIdState = atom<string | null>({
  key: 'historyChatroomIdState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default historyChatroomIdState;
