import { atom } from 'recoil';

import no_song from '../assets/no_song.webp';

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
  },
});

export const songsListAtom = atom({
  key: 'sngsList',
  default: {
    songs: [],
  },
});
