import Button from '../atoms/Button';

interface LocationFilterProps {
  onClick?: () => void;
  disabled?: boolean;
  locationType: 'city' | 'gungu' | 'dong' | '';
}

const LocationFilter = ({ locationType }: LocationFilterProps) => {
  return <Button text={locationType} />;
};

export default LocationFilter;
