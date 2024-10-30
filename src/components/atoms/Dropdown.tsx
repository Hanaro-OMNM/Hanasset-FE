import { Combobox } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

interface ComboboxProps {
  items: string[]; // 드롭다운 항목들
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  comboboxClassName?: string; // 드롭다운 컴포넌트 전체에 적용될 클래스
  optionClassName?: string; // 각 옵션에 적용될 클래스
}

const DropdownCombobox: React.FC<ComboboxProps> = ({
  items,
  selectedItem,
  setSelectedItem,
  comboboxClassName = '',
  optionClassName = '',
}) => {
  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <div className={`relative w-28 ${comboboxClassName}`}>
        {/* Combobox Input */}
        <div className="text-sm relative flex items-center rounded-md px-3 py-2">
          <Combobox.Button className="flex items-center w-full">
            {/* Input과 아이콘을 수평 정렬 */}
            <Combobox.Input
              className="w-full border-none text-black focus:outline-none"
              placeholder="입력"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item: string) => item}
              readOnly
            />
            <FiChevronDown
              className="w-5 h-5 text-hanaGreen"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        {/* Combobox Options */}
        {filteredItems.length > 0 && (
          <Combobox.Options className="text-sm absolute w-full mt-2 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {filteredItems.map((item, index) => (
              <Combobox.Option
                key={index}
                value={item}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-4 ${
                    active ? 'bg-white' : 'text-black'
                  } ${optionClassName}`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default DropdownCombobox;
