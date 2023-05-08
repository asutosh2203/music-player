import { atom } from 'recoil';

export const playlistAtom = atom({
  key: 'playlist',
  default: { __typename: 'Playlist', id: 1, title: 'For You' },
});

export const songAtom = atom({
  key: 'song',
  default: {
    __typename: 'Song',
    artist: 'Weeknd',
    duration: 0,
    photo:
      'https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg',
    progress: 0,
    title: 'Starboy',
    url: 'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3',

    _id: '61b6f14dc2f7cafd968c31f0',
    isPlaying: false,
    audioElem: null,
  },
});

export const songsListAtom = atom({
  key: 'songsList',
  default: {
    songs: [],
  },
});

export const searchAtom = atom({
  key: 'searchItem',
  default: {
    search: '',
  },
});

export const errorAtom = atom({
  key: 'errorState',
  default: {
    state: false,
    message: '',
  },
});

export const bgAtom = atom({
  key: 'background',
  default: {
    color: '#000000',
  },
});
