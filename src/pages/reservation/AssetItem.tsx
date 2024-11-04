// components/atoms/AssetItem.tsx
import { PiBuildingApartment } from 'react-icons/pi';
import CommonBackground from '../../components/atoms/CommonBackground';

interface AssetItemProps {
  name: string;
}

const AssetItem: React.FC<AssetItemProps> = ({ name }) => (
  <CommonBackground className="m-1 p-1">
    <div className="w-full flex h-full items-center p-2  ">
      <PiBuildingApartment className="text-xl text-hanaColor2 ml-2" />
      <div className="text-black font-medium ml-5">{name}</div>
    </div>
  </CommonBackground>
);

export default AssetItem;
