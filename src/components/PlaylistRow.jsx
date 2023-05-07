import { useState } from 'react';

const PlaylistRow = ({ title }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      className={`${
        isSelected ? 'text-white' : 'text-gray-400'
      } text-lg hover:text-white cursor-pointer `}
      onClick={() => {
        setIsSelected((prevState) => !prevState);
      }}
    >
      {title}
    </div>
  );
};

export default PlaylistRow;
