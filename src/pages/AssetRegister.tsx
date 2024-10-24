import { useLocation } from 'react-router-dom';
import CarRegisterImg from '../assets/img/carRegister.jpg';
import HomeRegisterImg from '../assets/img/homeRegister.jpg';
import EmptyButton from '../components/atoms/EmptyButton';

export default function AssetRegister() {
  const location = useLocation();
  const { assetType } = location.state || { assetType: 'car' };

  const registerTitleText =
    assetType === 'car' ? '내 차 시세는 얼마일까?' : '우리집은 얼마일까?';
  const registerDescriptionText =
    assetType === 'car'
      ? '지금 등록하고 시세를 확인해 보세요'
      : '지금 등록하고 가치를 확인해 보세요';
  const registerButtonText =
    assetType === 'car' ? '자동차 등록' : '부동산 등록';
  return (
    <>
      <div className="h-screen p-6 bg-bgColor">
        <div className="w-[325px] bg-white rounded-[10px] my-10 ">
          <div className="text-black text-xl font-['Inter'] tracking-tight mb-3 pt-3 text-center">
            {registerTitleText}
          </div>
          <div className="text-hanaSilver80 text-xs font-['Inter'] tracking-tight mb-3 text-center">
            {registerDescriptionText}
          </div>
          <div className="justify-center flex mb-3 ">
            <img
              src={assetType === 'car' ? CarRegisterImg : HomeRegisterImg}
              alt={assetType === 'car' ? 'Car Register' : 'Home Register'}
              className="w-40 h-40 mb-3"
            />
          </div>
          <div className="justify-center flex mb-3 ">
            <EmptyButton text={registerButtonText} />
          </div>
        </div>
      </div>
    </>
  );
}
