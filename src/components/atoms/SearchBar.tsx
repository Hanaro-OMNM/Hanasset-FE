import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useState } from 'react';

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="w-full max-w-md px-4 mt-6">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-200 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:border-[#ABCEC8] focus:outline-none"
          type="text"
          name="search"
          placeholder="아파트 검색"
          style={{ WebkitAppearance: 'none' }} // 기본으로 제공되는 x 버튼 숨기기
          value={searchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* 검색창이 focus 상태이거나, 글자를 입력 중이라면 x 아이콘이 나타나고, 그게 아니면 돋보기 아이콘이 나오도록 */}
        {isFocused || searchText ? (
          <button
            type="button"
            className="absolute right-0 top-0 mt-5 mr-4 hover:text-[#ABCEC8]"
            onClick={handleClear}
          >
            <FaRegTimesCircle />
          </button>
        ) : (
          <button
            type="submit"
            className="absolute right-0 top-0 mt-5 mr-4 hover:text-[#ABCEC8]"
          >
            <FaSearch />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
