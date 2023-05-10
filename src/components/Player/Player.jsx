import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SlList, SlPlaylist, SlShare } from 'react-icons/sl';

import { bgAtom, errorAtom, songAtom } from '../../recoil/atoms';
import no_song from '../../assets/no_song.webp';

import PlayerConsole from './PlayerConsole';
import { usePalette } from 'react-palette';
import SidebarMobile from '../Sidebar/SidebarMobile';
import SongsListMobile from '../SongsList/SongsListMobile';

const Player = () => {
  const [currentSong, setCurrentSong] = useRecoilState(songAtom);
  const error = useRecoilValue(errorAtom);
  const setBackground = useSetRecoilState(bgAtom);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [songListOpen, setSongListOpen] = useState(false);

  const audioRef = useRef();

  useEffect(() => {
    if (currentSong.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentSong.isPlaying]);

  useEffect(() => {
    setCurrentSong((prevState) => {
      return { ...prevState, audioElem: audioRef };
    });
  }, []);

  const { data, loading } = usePalette(currentSong.photo);

  useEffect(() => {
    !loading && setBackground({ color: data.darkVibrant });
  }, [data]);

  useEffect(() => {
    if (!isNaN(currentSong.audioElem?.current.currentTime))
      audioRef.current.currentTime = currentSong.audioElem?.current.currentTime;
  }, [currentSong.audioElem]);

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;

    setCurrentSong((prevState) => {
      return { ...prevState, progress: (ct / duration) * 100, duration };
    });
  };

  return (
    <div className='player flex-[0.55] h-screen overflow-hidden p-5 xl:ml-10'>
      {!error.state && (
        <audio ref={audioRef} src={currentSong.url} onTimeUpdate={onPlaying} />
      )}
      <div className='lg:max-w-[70%] max-w-[50%] min-w-[17.5rem] mx-auto mb-5 flex flex-col h-full justify-center space-y-10'>
        <div className='songDetails'>
          <h1 className='text-4xl font-bold capitalize'>
            {!currentSong.title || error.state
              ? 'No song is playing'
              : currentSong.title}
          </h1>

          <h4 className='pt-2 text-gray-300'>
            {!currentSong.artist || error.state
              ? 'Artist name'
              : currentSong.artist}
          </h4>
        </div>
        <img
          src={error.state ? no_song : currentSong.photo}
          alt='song-cover'
          className='rounded-md object-cover'
        />
        <PlayerConsole audio={audioRef} />
        <div className='flex items-center justify-center space-x-24 text-2xl'>
          {!sidebarOpen && (
            <SlPlaylist
              className='duration-500 cursor-pointer'
              onClick={() => {
                setSidebarOpen(true);
              }}
            />
          )}
          <SlShare className='cursor-pointer' />
          {!songListOpen && (
            <SlList
              className='duration-500 cursor-pointer'
              onClick={() => {
                setSongListOpen(true);
              }}
            />
          )}
        </div>
      </div>
      <SidebarMobile
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        setSonglistOpen={setSongListOpen}
      />
      <SongsListMobile open={songListOpen} setOpen={setSongListOpen} />
    </div>
  );
};

export default Player;
