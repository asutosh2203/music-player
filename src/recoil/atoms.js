import { atom } from 'recoil';

export const playlistAtom = atom({
  key: 'playlist',
  default: {
    id: 1,
    title: 'For You',
  },
});
