import React from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';

import SearchInput from './SearchInput';
import SongsList from './SongsList';
import SongsListHeader from './SongsListHeader';

const SongsListMobile = ({ open, setOpen }) => {
  return (
    <div
      className={`songsListMob flex-[0.3] px-5 duration-500 ${
        open && 'lg:-translate-y-[200%]'
      } -translate-x-5 bg-black/[0.85]`}
    >
      <div className='h-screen overflow-scroll'>
        <div className='flex pt-6 items-center justify-between'>
          <SongsListHeader />
          <FaChevronCircleDown
            className='text-2xl cursor-pointer lg:inline'
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <SearchInput />
        <SongsList />
      </div>
    </div>
  );
};

export default React.memo(SongsListMobile);
