import { atom } from 'recoil';

const centerAtom = atom({
  key: 'centerAtom',
  default: { lat: 37.438902, lng: 126.904998 },
});

export default centerAtom;
