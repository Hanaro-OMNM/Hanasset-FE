import { useRecoilState } from 'recoil';
import { useState } from 'react';
import Button from '../../../components/atoms/Button';
import FormRadio from '../../../components/molecules/FormRadio';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import { assetState } from '../../../recoil/asset/atom';

interface Option {
  value: string;
}

const options: Option[] = [
  { value: '중소, 중견' },
  { value: '대기업' },
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
  const [localJobType, setLocalJobType] = useState<string>(asset.jobType);

  const handleJobChange = (job: Option) => {
    setLocalJobType(job.value);
  };

  const putJobFormPropertyValue = async (localJobType: string) => {
    const updatedJobType =
      localJobType === '없음' ? options[0].value : localJobType;
    const response = await PlatformAPI.putPropertyValue(
      'jobType',
      updatedJobType
    );
    if (response === 200) {
      setAsset({
        ...asset,
        jobType: updatedJobType,
      });
      onBack();
    }
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
        <Button
          text="저장"
          onClick={() => putJobFormPropertyValue(localJobType)}
          version="ver1"
        />
      </div>
    </div>
  );
}
