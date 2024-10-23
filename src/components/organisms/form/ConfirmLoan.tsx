import { useState } from 'react';
import FormRadio from '../../molecules/FormRadio';

// 수정된 FormRadio 불러오기

// confirmlist의 타입 정의
interface ConfirmOption {
  name: string;
}

const confirmlist: ConfirmOption[] = [{ name: '있음' }, { name: '없음' }];

export default function JobForm() {
  const [selectedConfirm, setSelectedConfirm] = useState<ConfirmOption>(
    confirmlist[0]
  );

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <FormRadio<ConfirmOption>
        items={confirmlist}
        label="해당 아파트를 담보로 이미 받은 대출이 있나요?"
        selectedItem={selectedConfirm}
        onChange={setSelectedConfirm}
        // 항목을 보여줄 방식
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}
