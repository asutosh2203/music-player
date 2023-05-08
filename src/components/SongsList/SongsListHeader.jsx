import { useRecoilValue } from 'recoil';
import { playlistAtom } from '../../recoil/atoms';

const SongsListHeader = () => {
  const playlistTitle = useRecoilValue(playlistAtom).title;

  return (
    <div className='text-4xl pt-6 font-bold capitalize'>{playlistTitle}</div>
  );
};

export default SongsListHeader;
