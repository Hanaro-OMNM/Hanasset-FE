import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';

interface LocationFilterProps {
  onClick?: () => void;
  disabled?: boolean;
  locationType: string | null;
}

const LocationFilter = ({ locationType }: LocationFilterProps) => {
  const currCity: string = '서울시';
  const currGungu: string = '송파구';
  const currDong: string = '풍납1동';

  const city: string[] = [
    '서울',
    '경기',
    '인천',
    '부산',
    '울산',
    '대구',
    '광주',
    '강원',
    '세종',
    '충북',
  ];

  const gungu: string[] = [
    '강동구',
    '강남구',
    '송파구',
    '영등포구',
    '성동구',
    '광진구',
    '동작구',
  ];

  const dong: string[] = ['강일동', '길동', '천호동', '암사동', '성내동'];

  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('city', JSON.stringify(city));
  localStorage.setItem('gungu', JSON.stringify(gungu));
  localStorage.setItem('dong', JSON.stringify(dong));

  let storedLocations: string[];
  let storedKey: string;
  if (locationType === 'city') {
    storedLocations = JSON.parse(localStorage.getItem('city') || '[]');
    storedKey = 'currCity';
  } else if (locationType === 'gungu') {
    storedLocations = JSON.parse(localStorage.getItem('gungu') || '[]');
    storedKey = 'currGungu';
  } else {
    storedLocations = JSON.parse(localStorage.getItem('dong') || '[]');
    storedKey = 'currDong';
  }

  return (
    <div className="w-full px-6 pt-24">
      <h2 className="text-xl font-bold mb-6">주소로 골라보기</h2>
      <div className="w-full bg-white p-4">
        {/* <아이콘> 시/도 > 시/군/구 > 읍/면/동 */}
        <div className="flex items-center mb-10">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-hanaGreen40 mr-4">
            <HiOutlineOfficeBuilding color="white" />
          </div>
          <div className="text-hanaGreen40 mr-2">{currCity}</div>
          <MdNavigateNext color="#ABCEC8" className="mr-2" />
          <div className="text-hanaGreen40 mr-2">{currGungu}</div>
          <MdNavigateNext color="#ABCEC8" className="mr-2" />
          <div className="text-hanaGreen40 mr-2">{currDong}</div>
        </div>

        {/* 지역 선택 버튼 */}
        <div className="w-full grid grid-cols-3 gap-4 px-4 pb-6">
          {storedLocations.map((name) => (
            <button
              key={name}
              type="button"
              className="w-24 h-12 rounded-[10px] bg-[#eeeeee]"
              onClick={() =>
                localStorage.setItem(storedKey, JSON.stringify(name))
              }
            >
              <span className="font-medium hover:font-bold">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
