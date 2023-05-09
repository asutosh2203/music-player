import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { playlistAtom } from '../../recoil/atoms';

const PlaylistRow = ({ title, playlistId }) => {
  //state from recoil
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(playlist.id == playlistId);
  }, [playlist]);

  return (
    <div
      className={`${
        isSelected ? 'text-white' : 'text-gray-300/[0.8]'
      } text-lg hover:text-white cursor-pointer `}
      onClick={() => {
        setPlaylist({ id: playlistId, title });
      }}
    >
      {title}
    </div>
  );
};

export default PlaylistRow;
