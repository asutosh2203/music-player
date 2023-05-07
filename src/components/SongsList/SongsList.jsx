import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CiSearch } from 'react-icons/ci';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { GET_SONGS } from '../../queries/getQueries';
import { playlistAtom, songsListAtom } from '../../recoil/atoms';

import Spinner from '../Spinner';
import SongRow from './SongRow';

const SongsList = () => {
  //state from recoil
  const playlist = useRecoilValue(playlistAtom);
  const setSongsList = useSetRecoilState(songsListAtom);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: playlist.id,
      search,
    },
  });

  useEffect(() => {
    !loading && setSongsList({ songs: data.getSongs });
  }, [data]);

  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className='flex-[0.3]'>
      {loading && (
        <div className='h-screen flex items-center justify-center'>
          <Spinner loading={loading} color={'blue'} size={20} />
        </div>
      )}

      {!loading && !error && (
        <div className='h-screen overflow-scroll'>
          <div className='text-4xl py-6 font-bold capitalize'>
            {playlist.title}
          </div>
          <div className='bg-white/[0.15] flex items-center justify-between px-3 py-2 rounded-md my-5'>
            <input
              type='text'
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder='Search Songs, Artists'
              className='focus:outline-none bg-transparent flex-1'
            />
            <button
              onClick={() => {
                setSearch(searchInput);
              }}
            >
              <CiSearch />
            </button>
          </div>
          {data.getSongs.length <= 0 ? (
            <p>No Songs</p>
          ) : (
            data.getSongs.map((song) => <SongRow key={song._id} song={song} />)
          )}
        </div>
      )}
    </div>
  );
};

export default SongsList;
