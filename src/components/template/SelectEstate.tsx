import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
// Recoil 상태 가져오기
import { PlatformAPI } from '../../platform/PlatformAPI';
import { accessToken } from '../../recoil/token/atom';
// API 호출 메서드 import
import { selectedEstateType } from '../../types/hanaAsset';
import { RealEstatePreview } from '../../types/hanaAssetResponse.common';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import CommonBackground from '../atoms/CommonBackground';
import MobileHeader from '../atoms/MobileHeader';
import Swiper from '../atoms/Swiper';

const MAX_SELECTION = 3;
const itemsPerPage = 5;

export default function SelectEstate() {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState<RealEstatePreview[]>([]);
  const [slides, setSlides] = useState<RealEstatePreview[][]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const selectedItems: selectedEstateType[] = [];

  const token = useRecoilValue(accessToken);

  // Fetch apartments from API using PlatformAPI
  useEffect(() => {
    async function fetchApartments() {
      try {
        const response = await PlatformAPI.getBookmarkRealEstates();
        console.log('API Response:', response);

        const realEstates: RealEstatePreview[] =
          response?.result?.realEstates || [];
        setApartments(realEstates);
        setCheckedItems(Array(realEstates.length).fill(false));

        const generatedSlides = Array.from(
          { length: Math.ceil(realEstates.length / itemsPerPage) },
          (_, index) =>
            realEstates.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
        );
        setSlides(generatedSlides);
      } catch (error) {
        console.error('Error fetching apartments:', error);
        alert('데이터를 불러오는 중 문제가 발생했습니다.');
      }
    }

    fetchApartments();
  }, [token]); // 토큰 변경 시 API 호출

  const [reservationInfo, setReservationInfo] = useState<selectedEstateType[]>(
    []
  );
  const handleItemChange = (index: number, checked: boolean) => {
    const selectedCount = checkedItems.filter((item) => item).length;

    if (checked && selectedCount >= MAX_SELECTION) {
      alert(`최대 ${MAX_SELECTION}개까지만 선택 가능합니다.`);
      return;
    }

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);

    // 선택된 매물 업데이트
    const selectedEstates = apartments.filter((_, i) => updatedCheckedItems[i]);
    setReservationInfo(selectedEstates); // 상태 업데이트
    console.log('Updated ReservationInfo:', selectedEstates); // 콘솔 출력
  };

  const onBack = (): void => {
    window.history.back();
  };

  checkedItems.map((item, index) => {
    if (item) {
      selectedItems.push(apartments[index]);
    }
  });

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-gray-50/90 backdrop-blur-[10px] overflow-y-auto scrollbar-hide">
        <MobileHeader title="내 관심 매물" onBack={onBack} />
        <CommonBackground>
          <Swiper
            items={slides}
            renderItem={(pageApartments) => (
              <div className="mb-8">
                {pageApartments.map((apartment, index) => (
                  <div
                    key={apartment.realEstateId}
                    className="w-full items-start rounded-lg hover:transition-transform transform hover:scale-105"
                  >
                    <label>
                      <div className="content-center flex p-5">
                        <div className="content-center pl-5">
                          <Checkbox
                            aria-label={apartment.name}
                            checked={checkedItems[index]}
                            onChange={(checked) =>
                              handleItemChange(index, checked)
                            }
                          />
                        </div>
                        <div className="pl-7">
                          <div className="text-hanaGreen text-lg font-fontCm text-left">
                            {apartment.name}
                          </div>
                          <div className="text-hanaBlack80 text-sm text-left">
                            {apartment.addressDetail}
                          </div>
                          <div className="text-hanaSilver80 text-xs">
                            {apartment.description}
                          </div>
                        </div>
                      </div>
                      <hr className="ml-3 mr-3" />
                    </label>
                  </div>
                ))}
              </div>
            )}
            spaceBetween={30}
            slidesPerView={1}
          />
          <div className="p-2 mb-5">
            <Button
              onClick={() =>
                navigate('/chat-reservation', { state: { selectedItems } })
              }
              text="상담 예약하기"
            />
          </div>
        </CommonBackground>
      </div>
    </div>
  );
}
