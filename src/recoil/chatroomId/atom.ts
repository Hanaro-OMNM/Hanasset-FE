import { atom } from 'recoil';

const chatroomIdState = atom<string | null>({
  key: 'chatroomIdState', // Unique ID
  default: null, // Default value
});
export default chatroomIdState;
