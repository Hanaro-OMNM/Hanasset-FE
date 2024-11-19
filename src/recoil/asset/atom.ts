import { atom } from 'recoil';

// 직업 종류
export const jobTypeState = atom<string>({
  key: 'jobTypeState',
  default: '없음',
});

// 연수입
export const incomeAmountState = atom<number>({
  key: 'incomeAmountState',
  default: 0,
});

// 결혼 상태
export const isMarriedState = atom<boolean>({
  key: 'isMarriedState',
  default: false,
});

// 자녀 여부
export const hasChildrenState = atom<boolean>({
  key: 'hasChildrenState',
  default: false,
});

// 주택 소유 여부
export const hasHomeState = atom<boolean>({
  key: 'hasHomeState',
  default: false,
});

// 대출 여부와 금액
export const hasLoanState = atom<boolean>({
  key: 'hasLoanState',
  default: false,
});

export const loanAmountState = atom<number>({
  key: 'loanAmountState',
  default: 0,
});
