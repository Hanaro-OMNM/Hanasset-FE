import { Combobox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
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
      <div className={`relative w-64 ${comboboxClassName}`}>
        {/* Combobox Input */}
        <div className="relative w-full flex items-center space-x-2 border border-[#008485] rounded-md px-3 py-2 bg-white">
          <Combobox.Input
            className="w-full border-none focus:ring-0 text-black"
            placeholder="Select an option"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item: string) => item}
          />
          <Combobox.Button>
            <FiChevronDown
              className="w-5 h-5 text-[#008485]"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        {/* Combobox Options */}
        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute w-full mt-2 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {filteredItems.map((item, index) => (
              <Combobox.Option
                key={index}
                value={item}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? 'bg-[#008485] text-white' : 'text-black'
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
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <AiOutlineCheck
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </span>
                    )}
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
