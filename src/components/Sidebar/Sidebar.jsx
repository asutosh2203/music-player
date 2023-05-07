import { useQuery } from '@apollo/client';

import spotify_small from '../../assets/spotify_small.png';
import { GET_PLAYLISTS } from '../../queries/getQueries';

import Spinner from '../Spinner';
import PlaylistRow from './PlaylistRow';

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_PLAYLISTS);

  return (
    <div className='h-full flex-[0.15] flex flex-col justify-between py-8 px-5'>
      <div>
        <img alt='logo' className='pb-7' src={spotify_small} width={'70%'} />{' '}
        {/* <Spinner loading={loading} color={'blue'} size={10} /> */}
        <div className='flex flex-col space-y-7 w-full'>
          {!loading &&
            data.getPlaylists.map((playlist) => (
              <PlaylistRow
                key={playlist.id}
                title={playlist.title}
                playlistId={playlist.id}
              />
            ))}
        </div>
      </div>
      <img
        alt='profile-pic'
        src='https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg'
        className='h-12 w-12 rounded-full cursor-pointer'
      />
    </div>
  );
};

export default Sidebar;
