import React from 'react';

interface PropertyInfoProps {
  title: string;
  rentType: string;
  price: string;
  description: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  title,
  rentType,
  price,
  description,
}) => {
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <p className="text-lg font-semibold">{title}</p>
      <p
        className={`text-3xl font-bold ${rentType === '전세' ? 'text-hanaColor2' : 'text-red-600'}`}
      >
        <span>{rentType}</span> <span className="text-black">{price}</span>
      </p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default PropertyInfo;
