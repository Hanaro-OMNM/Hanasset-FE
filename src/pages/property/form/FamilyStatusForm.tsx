import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

interface Option {
  name: string;
}

const maritalStatusOptions: Option[] = [{ name: '결혼함' }, { name: '미혼' }];
const childrenStatusOptions: Option[] = [
  { name: '자녀 있음' },
  { name: '자녀 없음' },
];

interface FamilyStatusFormProps {
  onNext: (isMarried: boolean, hasChildren: boolean) => void;
}

export default function FamilyStatusForm({ onNext }: FamilyStatusFormProps) {
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<Option>(
    maritalStatusOptions[0]
  );
  const [selectedChildrenStatus, setSelectedChildrenStatus] = useState<Option>(
    childrenStatusOptions[1]
  );

  // 결혼 여부 변경 핸들러
  const handleMaritalStatusChange = (status: Option) => {
    setSelectedMaritalStatus(status);
    triggerOnNext(status, selectedChildrenStatus);
  };

  // 자녀 여부 변경 핸들러
  const handleChildrenStatusChange = (status: Option) => {
    setSelectedChildrenStatus(status);
    triggerOnNext(selectedMaritalStatus, status);
  };

  // 두 선택 값에 따라 onNext 호출
  const triggerOnNext = (maritalStatus: Option, childrenStatus: Option) => {
    const isMarried = maritalStatus.name === '결혼함';
    const hasChildren = childrenStatus.name === '자녀 있음';
    onNext(isMarried, hasChildren);
  };

  return (
    <div className="p-8 space-y-20">
      <FormRadio<Option>
        items={maritalStatusOptions}
        label="결혼 여부를 선택하세요."
        selectedItem={selectedMaritalStatus}
        onChange={handleMaritalStatusChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
      <FormRadio<Option>
        items={childrenStatusOptions}
        label="자녀 유무를 선택하세요."
        selectedItem={selectedChildrenStatus}
        onChange={handleChildrenStatusChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}
