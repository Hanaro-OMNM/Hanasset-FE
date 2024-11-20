import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import FormRadio from '../../../components/molecules/FormRadio';
import { assetState } from '../../../recoil/asset/atom';

interface Option {
  value: string;
}

interface OwnPropertyFormProps {
  onBack: () => void;
}

const options: Option[] = [{ value: '있음' }, { value: '없음' }];

export default function OwnPropertyForm({ onBack }: OwnPropertyFormProps) {
  const [asset, setAsset] = useRecoilState(assetState);

  const [localHasHome, setLocalHasHome] = useState(asset.hasHome);

  const selectedItem = localHasHome ? options[0] : options[1];

  const handlePropertyChange = (property: Option) => {
    const hasProperty = property.value === '있음';
    setLocalHasHome(hasProperty);
  };

  const handleSave = () => {
    setAsset({
      ...asset,
      hasHome: localHasHome,
    });
    onBack();
  };

  return (
    <div className="p-8">
      <FormRadio<Option>
        items={options}
        label="부동산 자산을 가지고 있나요?"
        selectedItem={selectedItem}
        onChange={handlePropertyChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.value}</p>
        )}
      />
      <div className="w-full mt-8">
        <Button text="저장" onClick={handleSave} version="ver1" />
      </div>
    </div>
  );
}
