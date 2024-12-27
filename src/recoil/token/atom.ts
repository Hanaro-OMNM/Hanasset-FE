import { atom } from 'recoil';

export const accessToken = atom<string | null>({
  key: 'accessToken',
  default: localStorage.getItem('accessToken'),
});
