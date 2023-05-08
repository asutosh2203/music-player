import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
  const setSongsList = useSetRecoilState(songsListAtom);
  const setError = useSetRecoilState(errorAtom);

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: playlist.id,
      search: searchItem.search,
    },
  });

  if (error) {
    setError((prevState) => {
      return { ...prevState, state: true, message: error.message };
    });
  }

  useEffect(() => {
    !loading && !error && setSongsList({ songs: data?.getSongs });
  }, [data]);

  return error ? (
    <Error errorMessage={'fetching the songs from the playlist'} />
  ) : (
    <>
      {loading && (
        <div className='h-[80%] flex items-center justify-center'>
          <Spinner loading={loading} color={'white'} />
        </div>
      )}

      {!loading && !error && (
        <>
          {data.getSongs.length <= 0 ? (
            <p className='text-center text-2xl mt-10'>No Songs Found ♪</p>
          ) : (
            data.getSongs.map((song) => <SongRow key={song._id} song={song} />)
          )}
        </>
      )}
    </>
  );
};

export default SongsList;
