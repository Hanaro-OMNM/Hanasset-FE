import { atom } from 'recoil';

const centerAtom = atom({
  key: 'centerAtom',
  default: { lat: 37.544713515, lng: 127.056343325 },
});

export default centerAtom;
