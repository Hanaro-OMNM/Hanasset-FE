import { atom } from 'recoil';

interface AssetState {
  jobType: string; // 직업 종류
  incomeAmount: number; // 연수입
  equityAmount: number; // 자본금
  isMarried: boolean; // 결혼 상태
  hasChildren: boolean; // 자녀 여부
  hasHome: boolean; // 주택 소유 여부
  hasLoan: boolean; // 대출 여부
  loanAmount: number; // 대출 금액
}

export const assetState = atom<AssetState>({
  key: 'assetState',
  default: {
    jobType: '없음',
    incomeAmount: 0,
    equityAmount: 0,
    isMarried: false,
    hasChildren: false,
    hasHome: false,
    hasLoan: false,
    loanAmount: 0,
  },
});
