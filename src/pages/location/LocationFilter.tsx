import { FaChevronLeft } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useState } from 'react';
import LocationFilters from '../../components/molecules/LocationFilters';

interface LocationFilterLayoutProps {
  locationType: 'city' | 'gungu' | 'dong' | '';
}

const LocationFilter = ({ locationType }: LocationFilterLayoutProps) => {
  const [activePage, setActivePage] = useState<'curr' | 'back'>('curr');

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="w-[420px]">
      {activePage === 'curr' ? (
        <div className="top-0 absolute pl-2">
          <div className="w-[420px] max-w-[420px] h-svh bg-white/75 backdrop-blur-[5px]">
            {/* 헤더 */}
            <div className="w-[420px] max-w-[420px] h-16 fixed top-0 bg-white border-b border-gray-200 z-10 px-4 py-2 flex justify-between items-center">
              <button type="button" onClick={() => setActivePage('back')}>
                <FaChevronLeft />
              </button>

              <input
                className="bg-white w-80 h-10 px-5 pr-16 rounded-lg text-sm focus:border-hanaGreen40 focus:outline-none"
                type="text"
                name="search"
                placeholder="아파트 이름, 지역명 검색"
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
                  className="hover:text-hanaGreen40"
                  onClick={handleClear}
                >
                  <FaRegTimesCircle />
                </button>
              ) : (
                <button type="submit" className="hover:text-hanaGreen40">
                  <FaSearch />
                </button>
              )}
            </div>

            {/* 지역 선택 필터 보여주기 */}
            <LocationFilters locationType={locationType} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationFilter;
