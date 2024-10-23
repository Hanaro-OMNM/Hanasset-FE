import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

// 수정된 FormRadio 불러오기

// joblist의 타입 정의
interface JobOption {
  name: string;
}

const joblist: JobOption[] = [
  { name: '직장인' },
  { name: '개인사업자' },
  { name: '임대사업자' },
  { name: '공무원' },
  { name: '기타' },
  { name: '무직' },
];

export default function JobForm() {
  const [selectedJob, setSelectedJob] = useState<JobOption>(joblist[0]);

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <FormRadio<JobOption>
        items={joblist}
        label="직업을 선택하세요"
        selectedItem={selectedJob}
        onChange={setSelectedJob}
        //항목을 보여줄 방식
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}

// className =
//   "text-[#b5b6b6] text-lg font-extrabold font-['Inter'] tracking-tight";
