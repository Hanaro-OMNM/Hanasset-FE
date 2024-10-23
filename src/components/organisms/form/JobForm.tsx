import { useState } from 'react';
import FormRadio from '../../molecules/FormRadio';

const joblist = [
  { name: '직장인' },
  { name: '개인사업자' },
  { name: '임대사업자' },
  { name: '공무원' },
  { name: '기타' },
  { name: '무직' },
];

export default function JobForm() {
  const [selectedJob, setSelectedJob] = useState(joblist[0]);

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <FormRadio
        items={joblist}
        label="직업을 선택하세요"
        selectedItem={selectedJob}
        onChange={setSelectedJob}
      />
    </div>
  );
}
