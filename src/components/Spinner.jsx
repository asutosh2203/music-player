import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';

function Spinner({ loading = false, color, size = 100 }) {
  return (
    <div className='sweet-loading'>
      <PropagateLoader
        color={color}
        loading={loading}
        size={size}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}

export default Spinner;
