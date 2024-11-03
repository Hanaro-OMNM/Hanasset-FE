import { FaChevronLeft } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Main from '../Main';
import LocationFilterCity from './LocationFiltersC';
import LocationFilterDong from './LocationFiltersD';
import LocationFilterGungu from './LocationFiltersG';

interface LocationFilterLayoutProps {
  locationType: 'city' | 'gungu' | 'dong' | '';
}

const LocationFilter = ({ locationType }: LocationFilterLayoutProps) => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<'curr' | 'back'>('curr');

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출의 기본 동작 방지
    navigate(`/search-result?query=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="w-430">
      {activePage === 'curr' ? (
        <div className="top-0 absolute pl-2">
          <div className="w-430 max-w-[430px] h-svh bg-white/75 backdrop-blur-[5px] overflow-y-auto">
            {/* 헤더 */}
            <form onSubmit={handleSubmit}>
              <div className="w-430 max-w-[430px] h-16 fixed top-0 bg-white border-b-4 border-gray-200 z-10 px-4 py-2 flex justify-between items-center">
                <button type="button" onClick={() => setActivePage('back')}>
                  <FaChevronLeft color="#1e293b" />
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
                    <FaRegTimesCircle color="#1e293b" />
                  </button>
                ) : (
                  <button type="submit" className="hover:text-hanaGreen40">
                    <FaSearch color="#1e293b" />
                  </button>
                )}
              </div>
            </form>

            <div className="w-full px-5 pt-24">
              {/* 지역 선택 필터 보여주기 */}
              {locationType === 'city' && <LocationFilterCity />}
              {locationType === 'gungu' && <LocationFilterGungu />}
              {locationType === 'dong' && <LocationFilterDong />}
            </div>
          </div>
        </div>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default LocationFilter;
