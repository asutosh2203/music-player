import { useQuery } from '@apollo/client';
import { GET_SONGS } from '../queries/getQueries';
import { useState } from 'react';

const SongsList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: { playlistId: 1, search },
  });

  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className='flex-[0.35] bg-gray-800'>
      {loading ? (
        <p>Loading</p>
      ) : (
        !loading &&
        !error &&
        (data.getSongs.length <= 0 ? (
          <p>No Songs Found</p>
        ) : (
          data.getSongs.map((song) => (
            <div key={song._id} className=''>
              <a href={song.url}>{song.title}</a>
              <br />
            </div>
          ))
        ))
      )}
      <input
        type='text'
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        placeholder='Search Songs'
      />
      <button
        onClick={() => {
          setSearch(searchInput);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SongsList;
