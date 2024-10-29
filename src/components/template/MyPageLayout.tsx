import { AiOutlineRight } from 'react-icons/ai';
import { PiBuildingApartment } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/img/profile_ex.jpg';
import CommonBackground from '../atoms/CommonBackground.tsx';
import RegisterButtonGroup from '../atoms/RegisterPageButtonGroup.tsx';
import SemiTitle from '../atoms/SemiTitle.tsx';
import Swiper from '../atoms/Swiper.tsx';
import EditProfile from '../template/EditProfile.tsx';
import EditProfileLayout from '../template/EditProfileLayout.tsx';

//

interface Asset {
  name: string;
}
interface Consultation {
  title: string;
  date: string;
  time: string;
}
export default function MyPageLayout() {
  // 더미데이터
  const profile = {
    imageSrc: profileImage,
    name: '김손님',
  };
  const handleEditProfile = () => {
    navigate('/모달로할까');
  };

  const consultations: Consultation[] = [
    { title: '전세금 안심 대출', date: '2024.09.12', time: '13:04' },
    { title: '하나 청년전세론', date: '2024.08.27', time: '16:34' },
  ];

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '아파트 2' },
    { name: '아파트 3' },
    { name: '아파트 4' },
    { name: '아파트 5' },
    { name: '아파트 6' },
  ];

  const interestAreas = ['성수', '홍대', '신촌', '합정', '건대', '종로'];

  const navigate = useNavigate();

  // car, home에 따라 assetRegister 페이지에서 글자, 이미지가 변경되도록
  const handleRegister = (assetType: 'car' | 'home') => {
    navigate('/assetRegister', { replace: true, state: { assetType } });
  };

  const handleConsultant = () => {
    console.log('상담페이지, 채팅으로 이동해야지');
  };
  const itemsPerPage = 2;
  // swiper 컴포넌트가 1차원 배열만 받음 // 내 관심 아파트 참고
  const slides: Asset[][] = Array.from(
    { length: Math.ceil(assets.length / itemsPerPage) },
    (_, index) => assets.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );

  return (
    <div className="w-[420px] p-6 backdrop-blur-[10px] absolute top-0 left-2 h-full overflow-y-auto bg-white/75">
      {/* 프로필 */}
      <EditProfile
        imageSrc={profile.imageSrc}
        name={profile.name}
        onEdit={handleEditProfile}
      />

      {/* 내 상담 내역 */}
      <SemiTitle>내 상담 내역</SemiTitle>
      <CommonBackground className="p-5">
        <div className="w-full">
          {consultations.map((consultation, index) => (
            <div
              key={index}
              onClick={handleConsultant}
              className="border-b last:border-none py-4 flex items-center justify-between hover:transition-transform transform hover:scale-105"
            >
              <button className="w-full text-left">
                <h3 className="text-lg">{consultation.title}</h3>
                <p className="text-xs text-gray-500">
                  마지막 상담: {consultation.date} {consultation.time}
                </p>
              </button>
              <AiOutlineRight className="text-gray-400 text-xl" />
            </div>
          ))}
        </div>
        <button
          onClick={handleConsultant}
          className="mt-6 w-full bg-hanaGreen60 hover:bg-hanaGreen80 text-white py-2 px-4 rounded-xl"
        >
          상담 내역 더 보기
        </button>
      </CommonBackground>

      {/*부동산/자동차 ==> 페이지 이동*/}
      <div className="mt-10">
        <RegisterButtonGroup onRegister={handleRegister} />
      </div>

      {/* 내 관심 지역 ==> 메인 지도에서 내 관심 지역으로 이동 */}
      <div className="h-32">
        <SemiTitle>내 관심 지역</SemiTitle>
        <Swiper
          items={interestAreas}
          pagination={false}
          renderItem={(item) => (
            <CommonBackground className="ml-1 h-20 flex items-center justify-center rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
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
            <div className="flex flex-col gap-4 h-52 mr-1 ml-1">
              {pageAssets.map((asset) => (
                <button
                  key={asset.name}
                  className="w-full transition-transform transform hover:scale-105"
                >
                  <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                    <PiBuildingApartment className="text-2xl text-hanaGreen" />
                    <div className="ml-4 text-gray-800 font-medium">
                      {asset.name}
                    </div>
                  </CommonBackground>
                </button>
              ))}
            </div>
          )}
          spaceBetween={30}
          slidesPerView={1}
        />
      </div>

      <div>
        <CommonBackground>
          <EditProfileLayout></EditProfileLayout>
        </CommonBackground>
      </div>
    </div>
  );
}
