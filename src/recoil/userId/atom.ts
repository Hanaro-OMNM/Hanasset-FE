import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

const userIdAtom = atom<number | null>({
  key: 'userId',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default userIdAtom;
