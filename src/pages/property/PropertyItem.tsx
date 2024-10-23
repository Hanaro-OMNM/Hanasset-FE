import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import React from 'react';

interface PropertyItemProps {
  label: string;
  value: string;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center py-4">
      <span className="text-gray-700">{label}</span>
      <div className="flex items-center">
        <span className="text-gray-600">{value || '없음'}</span>
        <MdOutlineKeyboardArrowRight className="ml-2 text-gray-600" />
      </div>
    </div>
  );
};

export default PropertyItem;
