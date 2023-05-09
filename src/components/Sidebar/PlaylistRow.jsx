import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { playlistAtom, songsListAtom } from '../../recoil/atoms';

const PlaylistRow = ({ title, playlistId }) => {
  //state from recoil
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const setSongsList = useSetRecoilState(songsListAtom);
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
        setSongsList({ songs: [] });
      }}
    >
      {title}
    </div>
  );
};

export default PlaylistRow;
