import { useSetRecoilState } from 'recoil';

import {  errorAtom, songAtom } from '../../recoil/atoms';

const SongRow = ({ song }) => {
  // State from Recoil
  const setCurrentSong = useSetRecoilState(songAtom);
  const setErrorState = useSetRecoilState(errorAtom);

  const mins = Math.floor(song.duration / 60);
  const secs = song.duration % 60;

  const changeSong = () => {
    setCurrentSong((prevState) => {
      if (prevState._id == song._id)
        return { ...song, isPlaying: !prevState.isPlaying };
      else
        return {
          ...song,
          isPlaying: true,
          audioElem: {
            ...prevState.audioElem,
            current: { currentTime: 0 },
          },
        };
    });
    setErrorState({ state: false, message: '' });
  };

  return (
    <div
      className='flex items-center p-4 rounded-lg cursor-pointer hover:bg-gray-400/[0.2]'
      onClick={changeSong}
    >
      <div className='flex flex-1 space-x-4'>
        <img
          className='h-12 w-12 rounded-full'
          src={song.photo}
          alt='song-pic'
        />
        <div>
          <p className='font-bold'>{song.title}</p>
          <p className='text-sm text-gray-400'>{song.artist}</p>
        </div>
      </div>
      <p className='text-sm text-gray-400'>
        {mins}:{secs}
      </p>
    </div>
  );
};

export default SongRow;
