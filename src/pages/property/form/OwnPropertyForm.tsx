import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import FormRadio from '../../../components/molecules/FormRadio';
import { hasHomeState } from '../../../recoil/asset/atom';

interface Option {
  value: string;
}

interface OwnPropertyFormProps {
  onBack: () => void;
}

const options: Option[] = [{ value: '있음' }, { value: '없음' }];

export default function OwnPropertyForm({ onBack }: OwnPropertyFormProps) {
  const [hasHome, setHasHome] = useRecoilState(hasHomeState);
  const [localHasHome, setLocalHasHome] = useState(hasHome);

  const selectedItem = localHasHome ? options[0] : options[1];

  const handlePropertyChange = (property: Option) => {
    const hasProperty = property.value === '있음';
    setLocalHasHome(hasProperty);
  };

  const handleSave = () => {
    setHasHome(localHasHome);
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
