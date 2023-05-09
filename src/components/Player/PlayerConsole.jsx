import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BsSkipBackwardFill,
  BsFillSkipForwardFill,
  BsThreeDots,
  BsVolumeUpFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
} from 'react-icons/bs';

import { errorAtom, songAtom, songsListAtom } from '../../recoil/atoms';
import { useRef } from 'react';

const PlayerConsole = ({ audio }) => {
  const [currentSong, setCurrentSong] = useRecoilState(songAtom);
  const songsList = useRecoilValue(songsListAtom).songs;
  const error = useRecoilValue(errorAtom);

  const clickRef = useRef(null);

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

  const controllerIconClass = 'h-6 w-6 m-3 ';
  return (
    <div className='w-full'>
      <div className='w-full mb-5'>
        <div
          className='min-w-full bg-[#777777]/[0.75] h-[5px] rounded-3xl cursor-pointer'
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            className='w-1/2 h-full bg-white rounded-3xl'
            style={{ width: `${currentSong.progress + '%'}` }}
          ></div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        {!error.state && (
          <div className='bg-gray-700/50 rounded-full cursor-pointer'>
            <BsThreeDots className={controllerIconClass} />
          </div>
        )}
        <div
          className={`flex items-center ${
            error.state && 'w-full justify-center'
          }`}
        >
          <button
            disabled={error.state}
            className='disabled:cursor-not-allowed'
          >
            <BsSkipBackwardFill
              className={controllerIconClass + 'text-gray-400'}
              onClick={skipBack}
            />
          </button>
          {!error.state && currentSong.isPlaying ? (
            <button
              disabled={error.state}
              className='disabled:cursor-not-allowed'
            >
              <BsPauseCircleFill
                className='h-12 w-12 m-5'
                onClick={playPauseHandler}
              />
            </button>
          ) : (
            <button
              disabled={error.state}
              className='disabled:cursor-not-allowed'
            >
              <BsPlayCircleFill
                className='h-12 w-12 m-5'
                onClick={playPauseHandler}
              />
            </button>
          )}
          <button
            disabled={error.state}
            className='disabled:cursor-not-allowed'
          >
            <BsFillSkipForwardFill
              className={controllerIconClass + 'text-gray-400'}
              onClick={skipForward}
            />
          </button>
        </div>
        {!error.state && (
          <div className='bg-gray-700/50 rounded-full cursor-pointer'>
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
        )}
      </div>
    </div>
  );
};

export default PlayerConsole;
