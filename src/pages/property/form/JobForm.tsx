import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import FormRadio from '../../../components/molecules/FormRadio';
import { assetState } from '../../../recoil/asset/atom';

interface Option {
  value: string;
}

const options: Option[] = [
  { value: '중소·중견기업 직장인' },
  { value: '대기업 직장인' },
  { value: '개인사업자' },
  { value: '임대사업자' },
  { value: '공무원' },
  { value: '군인' },
  { value: '무직' },
  { value: '기타' },
];

interface JobFormProps {
  onBack: () => void;
}

export default function JobForm({ onBack }: JobFormProps) {
  const [asset, setAsset] = useRecoilState(assetState);
  const jobType = asset.jobType;
  const [localJobType, setLocalJobType] = useState<string>(jobType);

  const handleJobChange = (job: Option) => {
    setLocalJobType(job.value);
  };

  const handleSave = () => {
    setAsset({
      ...asset,
      jobType: localJobType,
    });
    onBack();
  };

  const selectedItem: Option =
    options.find((option) => option.value === localJobType) || options[0];

  return (
    <div className="p-8">
      <FormRadio<Option>
        items={options}
        label="직업을 선택하세요"
        selectedItem={selectedItem}
        onChange={handleJobChange}
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
