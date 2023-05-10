import { useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchAtom, songsListAtom } from '../../recoil/atoms';

const SearchInput = () => {
  const [searchItem, setSearchItem] = useRecoilState(searchAtom);
  const setSongsList = useSetRecoilState(songsListAtom);

  const inputRef = useRef(null);

  return (
    <div className='bg-white/[0.15] flex items-center justify-between px-3 py-2 rounded-md my-5'>
      <input
        type='text'
        value={searchItem.search}
        onChange={(e) => {
          if (inputRef.current.value == '') {
            setSearchItem({ search: null });
            return;
          }
          setSearchItem({ search: e.target.value });
          setSongsList({ songs: [] });
        }}
        ref={inputRef}
        placeholder='Search Songs, Artists'
        className='focus:outline-none bg-transparent flex-1'
      />{' '}
      <CiSearch className='text-2xl' />
    </div>
  );
};

export default SearchInput;
