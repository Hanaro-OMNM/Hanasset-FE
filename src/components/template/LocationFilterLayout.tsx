import SearchHeader from '../atoms/SearchHeader';
import LocationFilter from '../molecules/LocationFilter';

interface LocationFilterLayoutProps {
  locationType: 'city' | 'gungu' | 'dong' | '';
}

const LocationFilterLayout = ({ locationType }: LocationFilterLayoutProps) => {
  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-2">
        <SearchHeader />
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px]">
          <LocationFilter locationType={locationType} />
        </div>
      </div>
    </div>
  );
};

export default LocationFilterLayout;
