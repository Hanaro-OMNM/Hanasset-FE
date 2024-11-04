import { FaChevronLeft, FaSearch, FaRegTimesCircle } from 'react-icons/fa';
import { useState } from 'react';
import LocationFilters from '../../components/molecules/LocationFilters';

interface LocationFilterLayoutProps {
  locationType: 'city' | 'gungu' | 'dong' | '';
  onBack: () => void;
}

const LocationFilter = ({
  locationType,
  onBack,
}: LocationFilterLayoutProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="w-[420px]">
      <div className="top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] max-w-[420px] h-svh bg-white/75 backdrop-blur-[5px] absolute">
          <div className="w-[420px] max-w-[420px] h-16 fixed top-0 bg-white border-b border-gray-200 z-10 px-4 py-2 flex justify-between items-center">
            <button type="button" onClick={onBack}>
              <FaChevronLeft />
            </button>

            <input
              className="bg-white w-80 h-10 px-5 pr-16 rounded-lg text-sm focus:border-hanaGreen40 focus:outline-none"
              type="text"
              name="search"
              placeholder="아파트 이름, 지역명 검색"
              style={{ WebkitAppearance: 'none' }}
              value={searchText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchText(e.target.value)}
            />

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

          <LocationFilters locationType={locationType} />
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
