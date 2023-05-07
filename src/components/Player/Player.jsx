import { useRecoilState } from 'recoil';

import { songAtom } from '../../recoil/atoms';
import PlayerConsole from './PlayerConsole';
import { useEffect, useRef } from 'react';

const Player = () => {
  const [currentSong, setCurrentSong] = useRecoilState(songAtom);
  const audioRef = useRef();

  useEffect(() => {
    if (currentSong.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong.isPlaying]);

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;

    setCurrentSong((prevState) => {
      return { ...prevState, progress: (ct / duration) * 100, duration };
    });
  };

  return (
    <div className='flex-[0.55] h-screen'>
      <audio ref={audioRef} src={currentSong.url} onTimeUpdate={onPlaying} />
      <div className='max-w-[50%] mx-auto flex flex-col h-full justify-center space-y-10'>
        <div>
          <h1 className='text-4xl font-bold capitalize'>
            {!currentSong.title ? 'No song is playing' : currentSong.title}
          </h1>
          <h4 className='pt-2 text-gray-300'>
            {!currentSong.artist ? 'Artist name' : currentSong.artist}
          </h4>
        </div>
        <img
          src={currentSong.photo}
          alt='song-cover'
          className='rounded-md object-cover'
        />
        <PlayerConsole audio={audioRef} />
      </div>
    </div>
  );
};

export default Player;
