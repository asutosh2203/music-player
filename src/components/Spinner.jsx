import { SyncLoader, PuffLoader } from 'react-spinners';

function Spinner({ loading = false, color }) {
  return (
    <div className='sweet-loading'>
      <PuffLoader
        color={color}
        loading={loading}
        size={100}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

export default Spinner;
