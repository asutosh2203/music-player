import { useQuery } from '@apollo/client';
import { FaChevronCircleDown } from 'react-icons/fa';

import spotify_small from '../../assets/spotify_small.png';
import { GET_PLAYLISTS } from '../../queries/getQueries';

import PlaylistRow from './PlaylistRow';
import Error from '../Error';
import React, { useState } from 'react';

const Wrapper = ({ children, open, setOpen }) => {
  //   const [open, setOpen] = useState(false);

  return (
    <div
      className={`hidden sidebarMob duration-500 h-screen flex-[0.15] lg:flex flex-col justify-between py-8 px-5 w-full ${
        open && '-translate-y-full'
      }  -translate-x-5 bg-black/[0.85]`}
    >
      <div>
        <div className='flex items-center justify-between mb-7'>
          <img alt='logo' src={spotify_small} width={'70%'} />
          <FaChevronCircleDown
            className='text-2xl cursor-pointer lg:inline'
            onClick={() => {
              setOpen(false);
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

const SidebarMobile = ({ open, setOpen }) => {
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
    <Wrapper open={open} setOpen={setOpen}>
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

export default React.memo(SidebarMobile);
