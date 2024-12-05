import React from 'react';
import PropertyStar from '../../../components/molecules/Star';

interface PropertyInfoProps {
  name: string | undefined;
  title: string | undefined;
  floor: string | undefined;
  rentType: string | undefined;
  price: number | undefined;
  isStarFilled: boolean;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  name,
  title,
  floor,
  rentType,
  price,
  isStarFilled,
}) => {
  function convertToEok(number: number) {
    return (number / 10000).toFixed(1) + '억';
  }

  const prcResult = price ? convertToEok(price) : undefined;

  return (
    <>
      <div className="w-full ml-96">
        <PropertyStar isFilled={isStarFilled} />
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        <p className="text-lg font-semibold">
          {name} {title} {floor}층
        </p>
        <p
          className={`text-3xl font-bold ${rentType === '전세' ? 'text-hanaColor2' : 'text-red-600'}`}
        >
          <span>{rentType}</span>{' '}
          <span className="text-black">{prcResult}</span>
        </p>
      </div>
    </>
  );
};

export default PropertyInfo;
