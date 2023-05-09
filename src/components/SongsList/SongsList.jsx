import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { GET_SONGS } from '../../queries/getQueries';
import {
  playlistAtom,
  searchAtom,
  songsListAtom,
  errorAtom,
} from '../../recoil/atoms';

import Spinner from '../Spinner';
import SongRow from './SongRow';
import Error from '../Error';

const SongsList = () => {
  //state from recoil
  const playlist = useRecoilValue(playlistAtom);
  const searchItem = useRecoilValue(searchAtom);
  const [songsList, setSongsList] = useRecoilState(songsListAtom);
  const setError = useSetRecoilState(errorAtom);

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: playlist.id,
      search: searchItem.search,
    },
  });
  
  if (songsList.songs.length === 0) {
    if (loading) {
      return (
        <div className='h-[80%] flex items-center justify-center'>
          <Spinner loading={loading} color={'white'} />
        </div>
      );
    } else if (data) {
      setSongsList({ songs: data?.getSongs });
    }

    if (error) {
      setError((prevState) => {
        return { ...prevState, state: true, message: error.message };
      });
      return <Error errorMessage={'fetching the songs from the playlist'} />;
    }
  }

  return (
    <>
      {songsList.songs.length <= 0 ? (
        <p className='text-center text-2xl mt-10'>No Songs Found ♪</p>
      ) : (
        songsList.songs.map((song) => <SongRow key={song._id} song={song} />)
      )}
    </>
  );
};

export default React.memo(SongsList);
