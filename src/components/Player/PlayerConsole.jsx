import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BsSkipBackwardFill,
  BsFillSkipForwardFill,
  BsThreeDots,
  BsVolumeUpFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
} from 'react-icons/bs';

import { songAtom, songsListAtom } from '../../recoil/atoms';
import { useEffect, useRef } from 'react';

const PlayerConsole = ({ audio }) => {
  const [currentSong, setCurrentSong] = useRecoilState(songAtom);
  const songsList = useRecoilValue(songsListAtom).songs;

  const clickRef = useRef(null);

  // useEffect(() => {
  //   if (!currentSong.isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [currentSong]);

  const playPauseHandler = () => {
    setCurrentSong((prevState) => {
      return { ...prevState, isPlaying: !prevState.isPlaying };
    });
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const progress = (offset / width) * 100;
    audio.current.currentTime = (progress / 100) * currentSong.duration;
  };

  const skipBack = () => {
    let index = songsList.findIndex((song) => song._id == currentSong._id);

    if (index < 0) {
      index = 1;
    }

    if (index == 0) {
      setCurrentSong({
        ...songsList[songsList.length - 1],
        isPlaying: true,
        progress: 0,
      });
    } else {
      setCurrentSong({ ...songsList[index - 1], isPlaying: true, progress: 0 });
    }
    audio.current.currentTime = 0;
  };

  const skipForward = () => {
    let index = songsList.findIndex((song) => song._id == currentSong._id);

    if (index < 0) {
      index = -1;
    }

    if (index == songsList.length - 1) {
      setCurrentSong({
        ...songsList[0],
        isPlaying: true,
        progress: 0,
      });
    } else {
      setCurrentSong({ ...songsList[index + 1], isPlaying: true, progress: 0 });
    }
    audio.current.currentTime = 0;
  };

  const setVolume = (e) => {};

  const controllerIconClass = 'h-6 w-6 m-3 cursor-pointer ';
  return (
    <div>
      <div className='navigation w-full mb-5'>
        <div
          className='navigation_wrapper min-w-full bg-[#777777]/[0.85] h-[5px] rounded-3xl cursor-pointer'
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            className='seek_bar w-1/2 h-full bg-white rounded-3xl'
            style={{ width: `${currentSong.progress + '%'}` }}
          ></div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='bg-gray-700/50 rounded-full cursor-pointer'>
          <BsThreeDots className={controllerIconClass} />
        </div>
        <div className='flex items-center'>
          <BsSkipBackwardFill
            className={controllerIconClass + 'text-gray-400'}
            onClick={skipBack}
          />
          {currentSong.isPlaying ? (
            <BsPauseCircleFill
              className='h-12 w-12 m-5 cursor-pointer'
              onClick={playPauseHandler}
            />
          ) : (
            <BsPlayCircleFill
              className='h-12 w-12 m-5 cursor-pointer'
              onClick={playPauseHandler}
            />
          )}
          <BsFillSkipForwardFill
            className={controllerIconClass + 'text-gray-400'}
            onClick={skipForward}
          />
        </div>
        <div className='bg-gray-700/50 rounded-full'>
          <BsVolumeUpFill className={controllerIconClass} />
          {/* <input
            type='range'
            defaultValue='50'
            className='mx-2 progressBarvolume bar volume'
            onChange={(e) => {
              audio.current.volume = e.target.value / 100;
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerConsole;
