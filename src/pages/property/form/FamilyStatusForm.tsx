import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

interface Option {
  value: string;
}

const options: Option[] = [
  { value: '결혼함, 자녀 있음' },
  { value: '결혼함, 자녀 없음' },
  { value: '미혼, 자녀 없음' },
  { value: '미혼, 자녀 있음' },
];

interface FamilyStatusFormProps {
  onNext: (isMarried: boolean, hasChildren: boolean) => void;
}

export default function FamilyStatusForm({ onNext }: FamilyStatusFormProps) {
  const [selectedStatus, setSelectedStatus] = useState<Option>(options[0]);

  const handleStatusChange = (status: Option) => {
    setSelectedStatus(status);
    triggerOnNext(status);
  };

  const triggerOnNext = (status: Option) => {
    const isMarried = status.value.includes('결혼함');
    const hasChildren = status.value.includes('자녀 있음');
    onNext(isMarried, hasChildren);
  };

  return (
    <div className="space-y-8 pb-10">
      <FormRadio<Option>
        items={options}
        label="가족상태를 선택하세요."
        selectedItem={selectedStatus}
        onChange={handleStatusChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.value}</p>
        )}
      />
    </div>
  );
}
