import { useState } from 'react';
import FormRadio from '../../molecules/FormRadio';

const confirmlist = [{ name: '있음' }, { name: '없음' }];

export default function JobForm() {
  const [selectedConfirm, setSelectedConfirm] = useState(confirmlist[0]);

  return (
    <div className="mt-5">
      <FormRadio
        items={confirmlist}
        label="해당 아파트를 담보로 이미 받은 대출이 있나요?"
        selectedItem={selectedConfirm}
        onChange={setSelectedConfirm}
      />
    </div>
  );
}
