import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

interface OwnPropertyOption {
  name: string;
}

const ownPropertyList: OwnPropertyOption[] = [
  { name: '있음' },
  { name: '없음' },
];

interface OwnPropertyFormProps {
  onNext: (hasProperty: boolean) => void;
}

export default function OwnPropertyForm({ onNext }: OwnPropertyFormProps) {
  const [selectedProperty, setSelectedProperty] = useState<OwnPropertyOption>(
    ownPropertyList[0]
  );

  // 자산 보유 여부를 선택한 후 다음 단계로 이동
  const handlePropertyChange = (property: OwnPropertyOption) => {
    setSelectedProperty(property);
    onNext(property.name === '있음'); // 선택한 값에 따라 hasProperty 값을 결정
  };

  return (
    <div className="p-4">
      <FormRadio<OwnPropertyOption>
        items={ownPropertyList}
        label="부동산 자산을 가지고 있나요? "
        selectedItem={selectedProperty}
        onChange={handlePropertyChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}
