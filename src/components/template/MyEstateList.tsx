import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import RealEstateDetail from '../../pages/RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from '../../pages/RealEstateList/RealEstateCard.tsx';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import { RealEstatePreview } from '../../types/hanaAssetResponse.common.ts';

export default function RealEstateLayout() {
  const { state } = useLocation(); // 2번 라인
  const sendBookmarkEstateList = state.bookMark as RealEstatePreview[];

  const [bookmarkEstateList, setBookmarkEstateList] = useState<
    RealEstatePreview[] | null
  >(sendBookmarkEstateList);

  const [selectedEstate, setSelectedEstate] =
    useState<RealEstatePreview | null>(null);

  const handleCardClick = (estate: RealEstatePreview) => {
    setSelectedEstate(estate);
  };

  const navigate = useNavigate();

  const isBookmarkedRealEstate = (id: number): boolean => {
    if (!bookmarkEstateList) return false;
    return bookmarkEstateList.some((item) => item.realEstateId === id);
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

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="w-[420px] px-2 pt-2 bg-gray-50/90 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
        <MobileHeader
          title="내 관심 매물"
          onBack={() => navigate('/my-page')}
        />
        <div className="flex-grow min-h-0 overflow-y-auto">
          {bookmarkEstateList &&
            bookmarkEstateList.map((item, index) => (
              <div key={index} className="border-b flex">
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
