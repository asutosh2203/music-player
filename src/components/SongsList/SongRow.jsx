const SongRow = ({ song }) => {
  const mins = Math.floor(song.duration / 60);
  const secs = song.duration % 60;
  return (
    <div className='flex items-center p-4 rounded-lg cursor-pointer hover:bg-gray-400/[0.2]'>
      <div className='flex flex-1 space-x-4'>
        <img
          className='h-12 w-12 rounded-full'
          src={song.photo}
          alt='song-pic'
        />
        <div>
          <p className='font-bold'>{song.title}</p>
          <p className='text-sm text-gray-400'>{song.artist}</p>
        </div>
      </div>
      <p className='text-sm text-gray-400'>
        {mins}:{secs}
      </p>
    </div>
  );
};

export default SongRow;
