import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import FormRadio from '../../../components/molecules/FormRadio';
import { assetState } from '../../../recoil/asset/atom';

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
  onBack: () => void;
}

export default function FamilyStatusForm({ onBack }: FamilyStatusFormProps) {
  const [asset, setAsset] = useRecoilState(assetState);

  const [localIsMarried, setLocalIsMarried] = useState(asset.isMarried);
  const [localHasChildren, setLocalHasChildren] = useState(asset.hasChildren);

  const selectedStatus =
    localIsMarried && localHasChildren
      ? options[0]
      : localIsMarried && !localHasChildren
        ? options[1]
        : !localIsMarried && localHasChildren
          ? options[3]
          : options[2];

  const handleStatusChange = (status: Option) => {
    const isMarriedValue = status.value.includes('결혼함');
    const hasChildrenValue = status.value.includes('자녀 있음');

    setLocalIsMarried(isMarriedValue);
    setLocalHasChildren(hasChildrenValue);
  };

  const handleSave = () => {
    setAsset({
      ...asset,
      isMarried: localIsMarried,
      hasChildren: localHasChildren,
    });

    onBack();
  };

  return (
    <div className="p-8">
      <FormRadio<Option>
        items={options}
        label="가족상태를 선택하세요."
        selectedItem={selectedStatus}
        onChange={handleStatusChange}
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
