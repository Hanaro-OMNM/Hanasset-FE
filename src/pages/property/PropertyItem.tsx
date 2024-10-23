import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import React from 'react';

interface PropertyItemProps {
  label: string;
  value: string;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center py-4 text-sm">
      <span className="text-hanaBlack60">{label}</span>
      <div className="flex items-center">
        <span className="text-hanaBlack80">{value || '없음'}</span>
        <MdOutlineKeyboardArrowRight className="ml-2 text-gray-600" />
      </div>
    </div>
  );
};

export default PropertyItem;
