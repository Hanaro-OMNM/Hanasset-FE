import { FaChevronLeft } from 'react-icons/fa';

/*
  SearchHeader? -> 피그마에서 "검색중" UI 확인하시면 됩니다.
*/

const SearchHeader: React.FC = () => {
  return (
    <div className="w-[420px] max-w-[420px] h-16 fixed top-0 bg-white border-b border-gray-200 z-10 px-4 py-2 flex justify-between items-center">
      <button type="button">
        <FaChevronLeft />
      </button>
    </div>
  );
};

export default SearchHeader;
