import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import centerAtom from '../../recoil/center/index.ts';
import {
  RealEstateList,
  RealEstatePreview,
} from '../../types/hanaAssetResponse.common.ts';
import RealEstateDetail from '../RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from './RealEstateCard.tsx';

export default function RealEstateLayout() {
  const location = useLocation();
  const state = location.state as RealEstateList;

  const center = useRecoilValue(centerAtom);
  const [currAddr, setCurrentAddr] = useState<string>('');
  const [selectedEstate, setSelectedEstate] =
    useState<RealEstatePreview | null>(null);
  const [bookmarkEstateList, setBookmarkEstateList] = useState<
    RealEstatePreview[] | null
  >(null);
  const realEstateCount = state.result.count;

  const fetchAddressData = async () => {
    try {
      const response = await fetch(
        `api/map-reversegeocode/v2/gc?coords=${center.lng},${center.lat}&output=json`,
        {
          method: 'GET',
          headers: {
            'x-ncp-apigw-api-key-id': `${import.meta.env.VITE_MAP_CLIENT_ID}`,
            'x-ncp-apigw-api-key': `${import.meta.env.VITE_MAP_CLIENT_SECRET}`,
          },
        }
      );
      const data = await response.json();
      const { area1, area2, area3 } = data.results[0].region;
      const address = `${area1.name} ${area2.name} ${area3.name}`;
      setCurrentAddr(address);
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const getBookmarkRealEstates = async () => {
    try {
      const bookmarkRealEstateListResponse =
        await PlatformAPI.getBookmarkRealEstates();
      if (bookmarkRealEstateListResponse) {
        const bookmarkRealEstateList =
          bookmarkRealEstateListResponse.result.realEstates;
        setBookmarkEstateList(bookmarkRealEstateList);
      }
    } catch (error) {
      console.error('Error getBookmarkRealEstates:', error);
    }
  };

  useEffect(() => {
    fetchAddressData();
    getBookmarkRealEstates();
  }, [state]);

  const handleCardClick = (estate: RealEstatePreview) => {
    const key = 'recentVisitedList';
    const existingList = localStorage.getItem(key);

    if (existingList) {
      // 기존 값이 있으면 파싱 후 배열의 맨 앞에 추가
      const parsedList = JSON.parse(existingList) as number[];
      // 중복 방지
      if (!parsedList.includes(estate.realEstateId)) {
        // 리스트 길이는 항상 3을 유지 -> 최근 확인한 매물은 항상 최대 3개만 유지
        if (parsedList.length === 3) {
          parsedList.pop();
        }

        parsedList.unshift(estate.realEstateId);
        localStorage.setItem(key, JSON.stringify(parsedList));
      }
    } else {
      localStorage.setItem(key, JSON.stringify([estate.name]));
    }

    setSelectedEstate(estate);
  };

  const isBookmarkedRealEstate = (id: number): boolean => {
    if (!bookmarkEstateList) return false;
    return bookmarkEstateList.some((item) => item.realEstateId === id);
  };

  const navigate = useNavigate();

  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
      <div className="w-[420px] px-2 pt-2 bg-gray-50/90 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
        <MobileHeader title={currAddr} onBack={() => navigate('/')} />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center font-bold ml-1">
            <div>{realEstateCount}개의 매물</div>
          </div>
        </div>
        <div className="flex-grow min-h-0 overflow-y-auto">
          {state.result.realEstates.map((item, index) => (
            <div key={index} className="border-b">
              <RealEstateCard
                estate={item}
                isBookmarked={isBookmarkedRealEstate(item.realEstateId)}
                onBookmarkUpdate={getBookmarkRealEstates}
                onClick={() => {
                  handleCardClick(item);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedEstate && (
        <RealEstateDetail
          realEstate={selectedEstate}
          isBookmarked={isBookmarkedRealEstate(selectedEstate.realEstateId)}
          onBookmarkUpdate={getBookmarkRealEstates}
          onBackClick={() => setSelectedEstate(null)}
        />
      )}
    </div>
  );
}
