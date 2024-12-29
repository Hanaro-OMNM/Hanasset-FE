import { atom, AtomEffect } from 'recoil';
import { AssetState } from '../../types/hanaAsset';

// LocalStorage와 동기화하는 Effect
const localStorageEffect =
  (key: string): AtomEffect<AssetState> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // 값이 변경될 때마다 LocalStorage에 저장
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const assetState = atom<AssetState>({
  key: 'assetState',
  default: {
    jobType: '없음',
    incomeAmount: -1,
    capitalAmount: -1,
    hasHome: null, // 초기값 null
    hasLoan: null, // 초기값 null
    annualInterest: -1,
    annualPrincipal: -1,
  },
  effects: [localStorageEffect('assetState')],
});
