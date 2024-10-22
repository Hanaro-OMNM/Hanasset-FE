import { RadioGroup } from '@headlessui/react';

interface RadioProps {
  name: string;
  options: { text: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Radio({
  name,
  options,
  selectedValue,
  onChange,
}: RadioProps) {
  return (
    <RadioGroup name={name} value={selectedValue} onChange={onChange}>
      <div className="space-y-2">
        {options.map((option) => (
          <RadioGroup.Option key={option.value} value={option.value}>
            {({ checked }: { checked: boolean }) => (
              <div
                className={`flex items-center p-2 rounded-lg cursor-pointer ${checked ? 'bg-gray-200' : 'bg-white'}`}
              >
                <RadioGroup.Indicator
                  className={`w-4 h-4 border border-gray-400 rounded-full ${checked ? 'bg-blue-500' : 'bg-white'}`}
                />
                <span
                  className={`ml-2 ${checked ? 'font-bold' : 'font-normal'}`}
                >
                  {option.text}
                </span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
