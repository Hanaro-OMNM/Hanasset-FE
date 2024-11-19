import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import DropdownCombobox from '../../components/atoms/Dropdown.tsx';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import centerAtom from '../../recoil/center/index.ts';
import RealEstateDetail from '../RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from './RealEstateCard.tsx';

type estateProps = {
  type: string;
  location: string;
  price: string;
  size: string;
  description: string;
  dealType: string;
  imageUrl: string;
};

const sortItems = [
  '최신순',
  '낮은가격순',
  '높은가격순',
  '넓은면적순',
  '좁은면적순',
];

export default function RealEstateLayout() {
  const center = useRecoilValue(centerAtom);
  const [currAddr, setCurrentAddr] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);
  const [selectedEstate, setSelectedEstate] = useState<estateProps | null>(
    null
  ); // 초기값을 null로 설정
  const [showRealEstate, setShowRealEstate] = useState(true);
  const realEstateCount = 27;

  useEffect(() => {
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

    fetchAddressData();
  }, [center]);

  const handleCardClick = (estate: estateProps) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정

    // 최근에 확인한 매물을 로컬 스토리지에 저장하는 로직
    const key = 'recentVisitedList';
    const existingList = localStorage.getItem(key);

    if (existingList) {
      // 기존 값이 있으면 파싱 후 배열의 맨 앞에 추가
      const parsedList = JSON.parse(existingList) as string[];
      // 중복 방지
      if (!parsedList.includes(estate.location)) {
        // 리스트 길이는 항상 3을 유지 -> 최근 확인한 매물은 항상 최대 3개만 유지
        if (parsedList.length === 3) {
          parsedList.pop();
        }

        parsedList.unshift(estate.location);
        localStorage.setItem(key, JSON.stringify(parsedList));
      }
    } else {
      // 기존 값이 없으면 새로운 배열 생성
      localStorage.setItem(key, JSON.stringify([estate.location]));
    }
  };

  const navigate = useNavigate();

  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
      <div className="w-[420px] px-2 pt-2 bg-white/70 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
        <MobileHeader title={currAddr} onBack={() => navigate('/')} />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center font-bold ml-1">
            <div>{realEstateCount}개의 매물</div>
          </div>
          <DropdownCombobox
            items={sortItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            comboboxClassName="border-gray-300 w-[130px] bg-white"
            optionClassName="hover:bg-gray-200"
          />
        </div>
        <div className="flex-grow min-h-0 overflow-y-auto">
          {realEstateData.map((item, index) => (
            <div key={index} className="border-b">
              {/* 카드 클릭 시 handleCardClick 호출 */}
              <RealEstateCard
                {...item}
                onClick={() => {
                  handleCardClick(item);
                  setShowRealEstate(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {showRealEstate && selectedEstate && (
        <RealEstateDetail
          estate={selectedEstate}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </div>
  );
}
