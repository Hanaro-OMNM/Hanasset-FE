import { atom, AtomEffect } from 'recoil';

interface AssetState {
  jobType: string; // 직업 종류
  incomeAmount: number; // 연수입
  equityAmount: number; // 자본금
  hasHome: boolean; // 주택 소유 여부
  hasLoan: boolean; // 대출 여부
  annualInterest: number; // 보유대출 연이자 상환액
  annualPrincipal: number; // 보유대출 연원금 상환액
}

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
    incomeAmount: 0,
    equityAmount: 0,
    hasHome: false,
    hasLoan: false,
    annualInterest: 0,
    annualPrincipal: 0,
  },
  effects: [localStorageEffect('assetState')],
});
