// components/atoms/AssetItem.tsx
import { LuMapPin } from 'react-icons/lu';

interface AssetItemProps {
  name: string;
}

const AssetItem: React.FC<AssetItemProps> = ({ name }) => (
  <div className="m-1 p-1 bg-gray-100 rounded-3xl">
    <div className="w-full flex h-full items-center p-2">
      <LuMapPin className="text-xl text-gray-400 ml-2" />
      <div className="text-black font-medium ml-5">{name}</div>
    </div>
  </div>
);

export default AssetItem;
