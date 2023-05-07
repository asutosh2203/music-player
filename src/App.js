import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Sidebar, SongsList, Player } from './components';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.ss.dev/resource/api',
    cache: new InMemoryCache({}),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div className='flex bg-black text-white h-screen'>
          <Sidebar />
          <SongsList />
          <Player/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
