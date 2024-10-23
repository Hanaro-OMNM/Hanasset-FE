import { Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

interface Plan {
  name: string;
  ram?: string;
  cpus?: string;
  disk?: string;
}

interface RadioMoleProps {
  items: Plan[];
  label: string;
  selectedItem: Plan;
  onChange: (item: Plan) => void;
}

export default function FormRadio({
  items,
  label,
  selectedItem,
  onChange,
}: RadioMoleProps) {
  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-4 text-xl font-extrabold">{label}</h2>
        <RadioGroup
          value={selectedItem}
          onChange={onChange}
          aria-label={label}
          className="space-y-2"
        >
          {items.map((item) => (
            <Radio
              key={item.name}
              value={item}
              className={`group relative flex cursor-pointer rounded-lg bg-white py-4 px-5  transition focus:outline-none
                ${
                  selectedItem.name === item.name
                    ? 'text-[#5a5657] bg-gray-100'
                    : 'text-[#B5B6B6]'
                }`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p
                    className={`font-semibold ${
                      selectedItem.name === item.name ? 'text-[#5a5657]' : ''
                    }`}
                  >
                    {item.name}
                  </p>
                  {item.ram && (
                    <div className="flex gap-2">
                      <div>{item.ram}</div>
                      <div aria-hidden="true">&middot;</div>
                      <div>{item.cpus}</div>
                      <div aria-hidden="true">&middot;</div>
                      <div>{item.disk}</div>
                    </div>
                  )}
                </div>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
