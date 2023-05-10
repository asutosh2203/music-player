import { useQuery } from '@apollo/client';
import { SlPlaylist } from 'react-icons/sl';

import spotify_small from '../../assets/spotify_small.png';
import { GET_PLAYLISTS } from '../../queries/getQueries';

import PlaylistRow from './PlaylistRow';
import Error from '../Error';
import React, { useState } from 'react';

const Wrapper = ({ children, open, setOpen }) => {
  return (
    <div
      className={`sidebar duration-300 h-full flex-[0.15] flex flex-col justify-between py-8 px-5 ${
        !open && 'xl:-translate-x-[80%] bg-transparent'
      } ${open && 'bg-black/[0.85]'} xl:z-10
      }`}
    >
      <div>
        <div className='flex items-center justify-between mb-7'>
          <img alt='logo' src={spotify_small} width={'70%'} />
          <SlPlaylist
            className='text-2xl cursor-pointer hidden xl:inline'
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
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
  const [open, setOpen] = useState(false);

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
    <Wrapper open={open} setOpen={setOpen}>
      <div className='flex flex-col space-y-7 w-full'>
        {playList.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => {
              setOpen(false);
            }}
          >
            <PlaylistRow title={playlist.title} playlistId={playlist.id} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(Sidebar);
