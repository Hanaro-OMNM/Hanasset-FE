import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

interface JobOption {
  name: string;
}

const joblist: JobOption[] = [
  { name: '중소·중견기업 직장인' },
  { name: '대기업 직장인' },
  { name: '개인사업자' },
  { name: '임대사업자' },
  { name: '공무원' },
  { name: '군인' },
  { name: '무직' },
  { name: '기타' },
];

export default function JobForm() {
  const [selectedJob, setSelectedJob] = useState<JobOption>(joblist[0]);

  const handleJobChange = (job: JobOption) => {
    setSelectedJob(job);
  };

  return (
    <div className="p-8">
      <FormRadio<JobOption>
        items={joblist}
        label="직업을 선택하세요"
        selectedItem={selectedJob}
        onChange={handleJobChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}
