import CarRegisterImg from '../../assets/img/carRegister.jpg';
import HomeRegisterImg from '../../assets/img/homeRegister.jpg';
import Button from '../atoms/Button';
import CommonBackground from '../atoms/CommonBackground';

interface AssetRegisterProps {
  assetType: 'home' | 'car';
  onBack: () => void;
  onClick?: () => void;
}

export default function AssetRegister({
  assetType,
  onBack,
}: AssetRegisterProps) {
  const registerTitleText =
    assetType === 'car' ? '내 차 시세는 얼마일까?' : '우리집은 얼마일까?';
  const registerDescriptionText =
    assetType === 'car'
      ? '지금 등록하고 시세를 확인해 보세요'
      : '지금 등록하고 가치를 확인해 보세요';
  const registerButtonText =
    assetType === 'car' ? '자동차 등록' : '부동산 등록';

  return (
    <CommonBackground>
      <div className="text-black text-xl tracking-tight mb-3 pt-3 text-center">
        {registerTitleText}
      </div>
      <div className="text-hanaSilver80 text-xs tracking-tight mb-3 text-center">
        {registerDescriptionText}
      </div>
      <div className="justify-center flex mb-3">
        <img
          src={assetType === 'car' ? CarRegisterImg : HomeRegisterImg}
          alt={assetType === 'car' ? 'Car Register' : 'Home Register'}
          className="w-40 h-40 mb-3"
        />
      </div>
      <div className="justify-center flex mr-5 ml-5 mb-5">
        <Button text={registerButtonText} version="ver2" />
      </div>
      <div className="justify-center flex mr-5 ml-5 pb-5">
        <Button text="메인화면으로 돌아가기" onClick={onBack} version="ver2" />
      </div>
    </CommonBackground>
  );
}
