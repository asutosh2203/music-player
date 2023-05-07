import { usePalette } from 'react-palette';
import no_song from '../assets/no_song.webp';

const Pallete = () => {
  const { data, loading, error } = usePalette(no_song);

  !loading && console.log(data);

  if (loading) return <p>Loading</p>;

  return (
    <div
      style={{ backgroundColor: data.darkMuted }}
      className={`h-screen w-screen`}
    >
      React Pallete
    </div>
  );
};

export default Pallete;
