import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// `localStorage`를 기본으로 설정 (옵션으로 `sessionStorage` 사용 가능)
const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // 저장 키 (기본값: "recoil-persist")
  storage: localStorage, // localStorage 또는 sessionStorage 선택 가능
});

const userIdAtom = atom<number | null>({
  key: 'userId',
  default: null,
  effects_UNSTABLE: [persistAtom], // persistAtom 효과 추가
});

export default userIdAtom;
