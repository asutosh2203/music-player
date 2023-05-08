import { SyncLoader, PuffLoader } from 'react-spinners';

function Spinner({ loading = false, color }) {
  return (
    <div className='sweet-loading'>
      {Math.floor(Math.random() * 100) % 2 == 0 ? (
        <SyncLoader
          color={color}
          loading={loading}
          size={12}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <PuffLoader
          color={color}
          loading={loading}
          size={100}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      )}
    </div>
  );
}

export default Spinner;
