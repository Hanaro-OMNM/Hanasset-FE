import { useState } from 'react';
import FormRadio from '../../../components/molecules/FormRadio';

interface ConfirmOption {
  name: string;
}

const confirmlist: ConfirmOption[] = [{ name: '있음' }, { name: '없음' }];

interface ConfirmLoanFormProps {
  onNext: (hasLoan: boolean) => void;
}

export default function ConfirmLoanForm({ onNext }: ConfirmLoanFormProps) {
  const [selectedConfirm, setSelectedConfirm] = useState<ConfirmOption>(
    confirmlist[0]
  );

  // 대출 여부를 선택한 후 다음 단계로 이동
  const handleConfirmChange = (confirm: ConfirmOption) => {
    setSelectedConfirm(confirm);
    onNext(confirm.name === '있음'); // 선택한 값에 따라 hasLoan 값을 결정
  };

  return (
    <div className="p-4">
      <FormRadio<ConfirmOption>
        items={confirmlist}
        label="해당 아파트를 담보로 이미 받은 대출이 있나요?"
        selectedItem={selectedConfirm}
        onChange={handleConfirmChange}
        display={(item) => (
          <p className="text-lg font-extrabold">{item.name}</p>
        )}
      />
    </div>
  );
}
