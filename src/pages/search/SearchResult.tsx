import Papa from 'papaparse';
import { FaChevronLeft } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import redAlert from '../../assets/img/redAlert.png';
import CommonBackground from '../../components/atoms/CommonBackground';
import RecentCheckedButton from '../../components/atoms/RecentCheckedButton';
import centerAtom from '../../recoil/center';

type localSearchResult = {
  title: string;
  lng: number;
  lat: number;
};

const SearchResult = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const setCenter = useSetRecoilState(centerAtom);

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState<string>(query ?? '');
  const [localSearchResults, setLocalSearchResults] = useState<
    localSearchResult[]
  >([]);

  const handleClear = () => {
    setSearchText('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출의 기본 동작 방지
    navigate(`/search-result?query=${encodeURIComponent(searchText)}`);
  };

  useEffect(() => {
    setSearchText(query ?? '');
    const fetchData = async () => {
      const fetchLocalSearchResults = new Set<localSearchResult>();
      await fetch('src/assets/output.csv')
        .then((response) => response.text())
        .then((csvString) => {
          Papa.parse<string>(csvString, {
            complete: (results) => {
              results.data.forEach((row) => {
                if (fetchLocalSearchResults.size < 5) {
                  if (row[1] && row[1].includes(searchText)) {
                    fetchLocalSearchResults.add({
                      title: row[1],
                      lat: parseFloat(row[3] || '0'),
                      lng: parseFloat(row[2] || '0'),
                    });
                  }
                }
              });
              setLocalSearchResults(Array.from(fetchLocalSearchResults));
            },
          });
        });
    };
    fetchData();
  }, [query]);

  return (
    <div className="w-[420px]">
      <div className="top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] max-w-[420px] h-svh bg-gray-50/90 backdrop-blur-[5px] absolute overflow-y-auto">
          {/* 헤더 */}
          <div className="w-[420px] max-w-[420px] h-16 fixed top-0 bg-white border-b border-gray-200 z-10 px-4 py-2 flex justify-between items-center">
            <button type="button" onClick={() => navigate('/home')}>
              <FaChevronLeft />
            </button>
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit}>
                <input
                  className="bg-white w-80 h-10 px-5 pr-10 rounded-lg text-sm focus:border-hanaGreen40 focus:outline-none"
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
              </form>
            </div>
          </div>

          <div className="w-full px-5 pt-24">
            <h2 className="text-xl text-slate-800 font-bold mb-6">
              매물 검색 결과
            </h2>
            <CommonBackground className="w-full px-5 py-3">
              <div>
                일치하는 매물이 없습니다. 다른 검색어로 시도해 보세요.
                <img src={redAlert} />
              </div>
            </CommonBackground>
          </div>

          <div className="w-full px-5 pt-24">
            <h2 className="text-xl text-slate-800 font-bold mb-6">
              지역 검색 결과
            </h2>
            <CommonBackground className="w-full px-5 py-3">
              {localSearchResults.length > 0 ? (
                localSearchResults.map((result) => (
                  <RecentCheckedButton
                    title={result.title}
                    onClick={() =>
                      setCenter({
                        lat: result.lat,
                        lng: result.lng,
                      })
                    }
                  />
                ))
              ) : (
                <div>
                  일치하는 지역이 없습니다. 다른 검색어로 시도해 보세요.
                  <img src={redAlert} />
                </div>
              )}
            </CommonBackground>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
