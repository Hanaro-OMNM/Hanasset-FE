import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-md px-4 mt-6">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-200 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:border-[#ABCEC8] focus:outline-none"
          type="text"
          name="search"
          placeholder="아파트 이름 검색"
          style={{ WebkitAppearance: 'none' }} // 기본 x 버튼 숨기기
        />
        <button
          type="button"
          className="absolute right-7 top-0 mt-5 mr-4 hover:text-[#ABCEC8]"
          onClick={() => {
            const searchInput = document.querySelector(
              'input[name="search"]'
            ) as HTMLInputElement | null;
            if (searchInput) {
              searchInput.value = ''; // input 값 초기화
            }
          }}
        >
          <FaRegTimesCircle />
        </button>
        <button
          type="submit"
          className="absolute right-0 top-0 mt-5 mr-4 hover:text-[#ABCEC8]"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
