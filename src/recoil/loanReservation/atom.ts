import { atom } from 'recoil';
import { selectedEstateType } from '../../types/global';

interface LoanReservationState {
  reservationInfo: selectedEstateType[]; // `any[]`를 필요한 타입으로 수정할 수 있음
  reservationTime: undefined | string;
}

const loanReservationAtom = atom<LoanReservationState>({
  key: 'loanReservationAtom',
  default: {
    reservationInfo: [],
    reservationTime: undefined,
  },
});

export default loanReservationAtom;
