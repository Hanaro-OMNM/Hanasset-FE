import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { PiBuildingApartment } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import CommonBackground from '../components/atoms/CommonBackground';
import DoughnutChart from '../components/atoms/DoughnutChart';
import RegisterButtonGroup from '../components/atoms/RegisterPageButtonGroup';
import SemiTitle from '../components/atoms/SemiTitle';
import Swiper from '../components/atoms/Swiper';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Asset {
  name: string;
}

export default function MyPage() {
  const navigate = useNavigate();

  const handleRegister = (assetType: 'car' | 'home') => {
    navigate('/assetRegister', { state: { assetType } });
  };

  const interestAreas = ['성수', '홍대', '신촌', '합정', '건대', '종로'];

  const itemsPerPage = 2;

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '아파트 2' },
    { name: '아파트 3' },
    { name: '아파트 4' },
    { name: '아파트 5' },
    { name: '아파트 6' },
  ];

  const slides: Asset[][] = Array.from(
    { length: Math.ceil(assets.length / itemsPerPage) },
    (_, index) => assets.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );

  return (
    <div className="w-[320px] p-6 bg-bgColor mr-auto">
      {/* 내 자산 ==> 사용자 자산 차트로 보여줌 */}
      <div>
        <SemiTitle>내 자산</SemiTitle>
        <CommonBackground>
          <DoughnutChart />
        </CommonBackground>
      </div>

      {/*부동산/자동차 ==> 페이지 이동*/}
      <div>
        <RegisterButtonGroup onRegister={handleRegister} />
      </div>

      {/* 내 관심 지역 ==> 메인 지도에서 내 관심 지역으로 이동 */}
      <div>
        <SemiTitle>내 관심 지역</SemiTitle>
        <Swiper
          items={interestAreas}
          pagination={false}
          renderItem={(item) => (
            <CommonBackground className="h-20 flex items-center justify-center">
              {item}
            </CommonBackground>
          )}
        />
      </div>

      {/* 내 관심 아파트 ==> 메인 지도에서 내 관심 아파트로 이동 */}
      <div>
        <SemiTitle>내 관심 아파트</SemiTitle>
        <Swiper
          items={slides}
          renderItem={(pageAssets: Asset[]) => (
            <div className="flex flex-col gap-2 h-52">
              {pageAssets.map((asset) => (
                <button key={asset.name} className="w-full">
                  <CommonBackground className="flex items-center p-2 h-20">
                    <PiBuildingApartment />
                    <div className="ml-6">{asset.name}</div>
                  </CommonBackground>
                </button>
              ))}
            </div>
          )}
          spaceBetween={30}
          slidesPerView={1}
        />
      </div>
    </div>
  );
}
