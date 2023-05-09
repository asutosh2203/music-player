import { useQuery } from '@apollo/client';

import spotify_small from '../../assets/spotify_small.png';
import { GET_PLAYLISTS } from '../../queries/getQueries';

import PlaylistRow from './PlaylistRow';
import Error from '../Error';
import React, { useState } from 'react';

const Wrapper = ({ children }) => {
  return (
    <div className='sidebar h-full flex-[0.15] flex flex-col justify-between py-8 px-5'>
      <div>
        <img alt='logo' className='pb-7' src={spotify_small} width={'70%'} />
        {children}
      </div>
      <img
        alt='profile-pic'
        src='https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg'
        className='h-12 w-12 rounded-full cursor-pointer'
      />
    </div>
  );
};

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_PLAYLISTS);

  const [playList, setPlayList] = useState([]);

  if (playList.length === 0) {
    if (loading) {
      return <Wrapper />;
    } else if (data) {
      setPlayList(data.getPlaylists);
    }

    if (error) {
      return (
        <Wrapper>
          <Error errorMessage={'in fetching the playlists'} />
        </Wrapper>
      );
    }
  }

  return (
    <Wrapper>
      <div className='flex flex-col space-y-7 w-full'>
        {playList.map((playlist) => (
          <PlaylistRow
            key={playlist.id}
            title={playlist.title}
            playlistId={playlist.id}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(Sidebar);
