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

  return (
    <div className="w-full px-6 pt-24">
      <h2 className="text-xl font-bold mb-6">주소로 골라보기</h2>
      <div className="w-full bg-white p-4">
        {/* <아이콘> 시/도 > 시/군/구 > 읍/면/동 */}
        <div className="flex items-center mb-10">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ABCEC8] mr-4">
            <HiOutlineOfficeBuilding color="white" />
          </div>
          <div className="text-[#ABCEC8] mr-2">{currCity}</div>
          <MdNavigateNext color="#ABCEC8" className="mr-2" />
          <div className="text-[#ABCEC8] mr-2">{currGungu}</div>
          <MdNavigateNext color="#ABCEC8" className="mr-2" />
          <div className="text-[#ABCEC8] mr-2">{currDong}</div>
        </div>

        {/* 지역 선택 버튼 */}
        <div className="w-full grid grid-cols-3 gap-4 px-4 pb-6">
          <button
            type="button"
            className="w-24 h-12 rounded-[10px] bg-[#eeeeee]"
          >
            <span className="font-medium hover:font-bold">{locationType}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
