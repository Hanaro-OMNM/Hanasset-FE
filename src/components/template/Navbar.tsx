import { FaHome, FaMap } from 'react-icons/fa';
import { FaHouseUser } from 'react-icons/fa6';
import Logo from '../../assets/img/logo.png';
import Profile from '../../assets/img/profile_ex.jpg';

const Navbar: React.FC = () => {
  return (
    <div className="w-[85px] h-full left-0 top-0 p-4 absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center z-50">
      {/* 로고 이미지 */}
      <a
        href="/"
        className="w-[55px] h-[79.54px] mt-4 mb-10 flex flex-col items-center justify-center"
      >
        <img className="w-[50px] h-[50.34px]" src={Logo} alt="Logo Image" />
        <div className="w-[50px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
          OMNM
        </div>
      </a>
      {/* 메뉴 버튼들 */}
      {/* 메뉴 버튼들 일단은 그냥 div로 구성한 상태 -> 추후 리팩토링 예정 */}
      <div className="w-[58px] h-[300px] mb-[9rem] flex flex-col items-center justify-between">
        <div className="w-[58px] h-[87px] flex flex-col items-center">
          {/* 선택된 버튼은 배경색 #008485로 변함 */}
          <div className="w-[50px] h-[50px] bg-[#008485] rounded-lg shadow flex items-center justify-center">
            <FaHome className="w-[25px] h-[25px]" color="#ffffff" />
          </div>
          <div className="w-[15px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center mt-2">
            홈
          </div>
        </div>

        <div className="w-[58px] h-[87px] flex flex-col items-center">
          <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center">
            <FaMap className="w-[25px] h-[25px]" color="#000000" />
          </div>
          <div className="w-[30px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
            지도
          </div>
        </div>

        <div className="w-[58px] h-[87px] flex flex-col items-center">
          <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center">
            <FaHouseUser className="w-[25px] h-[25px]" color="#000000" />
          </div>
          <div className="w-[50px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
            마이홈
          </div>
        </div>
      </div>

      {/* 프로필 이미지 */}
      {/* 추후 프로필 수정 페이지로 이동할 수 있도록 수정 예정 */}
      <div className="w-[50px] h-[50px] mb-4">
        <img
          className="w-full h-full rounded-full"
          src={Profile}
          alt="Profile Image"
        />
      </div>
    </div>
  );
};

export default Navbar;
