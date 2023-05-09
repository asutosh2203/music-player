import React, { useEffect } from 'react';
import SearchInput from './SearchInput';
import SongsList from './SongsList';
import SongsListHeader from './SongsListHeader';

const SongsListWrapper = () => {

  return (
    <div className='flex-[0.3] songsListWrapper'>
      <div className='h-screen overflow-scroll'>
        <SongsListHeader title={''} />
        <SearchInput />
        <SongsList />
      </div>
    </div>
  );
};

export default React.memo(SongsListWrapper);
