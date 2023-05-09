import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Sidebar, SongsListWrapper, Player } from './components';
import { useRecoilValue } from 'recoil';
import { bgAtom } from './recoil/atoms';
import { useEffect, useRef } from 'react';

import './App.css';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.ss.dev/resource/api',
    cache: new InMemoryCache({}),
  });

  const background = useRecoilValue(bgAtom);

  const bgRef = useRef(null);

  useEffect(() => {
    bgRef.current.style.background = `linear-gradient(108.18deg, ${background.color} 2.46%, rgba(0, 0, 0, 0.6) 99.84%), #000000`;
  }, [background.color]);

  return (
    <>
      <ApolloProvider client={client}>
        <div
          ref={bgRef}
          style={{ backgroundColor: 'black' }}
          className='App flex text-white h-screen'
        >
          <Sidebar />
          <SongsListWrapper />
          <Player />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
