import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Sidebar, SongsListWrapper, Player } from './components';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.ss.dev/resource/api',
    cache: new InMemoryCache({}),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div
          style={{ backgroundColor: 'black' }}
          className='flex text-white h-screen'
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
