// components/atoms/AssetItem.tsx
import { PiBuildingApartment } from 'react-icons/pi';
import CommonBackground from '../../components/atoms/CommonBackground';

interface AssetItemProps {
  name: string;
}

const AssetItem: React.FC<AssetItemProps> = ({ name }) => (
  <CommonBackground className="flex  h-20 rounded-lg shadow-md mb-5">
    <div className="w-full flex h-full items-center p-2 ">
      <PiBuildingApartment className="text-2xl text-hanaGreen" />
      <div className="text-gray-800 font-medium ml-5">{name}</div>
    </div>
  </CommonBackground>
);

export default AssetItem;
