import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import centerAtom from '../../../recoil/center/index.ts';
import Footer from '../Footer.tsx';
import MapMarkerCluster from '../MapLayout/MapMarkerCluster.tsx';
import MapPanel from '../MapLayout/MapPannel.tsx';
import { Navbar } from '../Navbar.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MapLayout({ children }: LayoutProps) {
  const naverMaps = useNavermaps();
  const mapRef = useRef<naver.maps.Map | null>(null);

  const [showControlPanel, setShowControlPanel] = useState(false);
  const [mapType, setMapType] = useState(naverMaps.MapTypeId.NORMAL);
  const [selectedEstate, setSelectedEstate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (selectedEstate && location.pathname !== '/real-estate-list') {
      setSelectedEstate(false);
    }
  }, [selectedEstate, location.pathname]); // 의존성 배열에 location.pathname만 추가

  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useRecoilState(centerAtom);

  const handleZoomChanged = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) =>
          console.error('Error occurred while fetching location:', error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="w-full h-svh relative bg-[#f8fafb]">
      <MapDiv
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="fixed flex right-2 top-1/4">
          <MapPanel
            showControlPanel={showControlPanel}
            mapType={mapType}
            setMapType={setMapType}
          />
          <button
            className={`${
              showControlPanel
                ? 'bg-[#008485] text-white'
                : 'bg-white text-[#008485]'
            } font-semibold px-1 py-1 rounded-md text-xs w-10 h-10 transition-colors flex items-center justify-center`}
            onClick={() => setShowControlPanel((prev) => !prev)}
          >
            지도 도구
          </button>
        </div>
        <div className="fixed right-2 bottom-6 flex flex-col space-y-2">
          <button
            className="bg-white text-[#008485] font-semibold px-1 py-1 rounded-md text-xs w-10 h-10 hover:bg-[#008485] hover:text-white flex items-center justify-center"
            onClick={handleZoomIn}
          >
            <FaPlus />
          </button>
          <button
            className="bg-white text-[#008485] font-semibold px-1 py-1 rounded-md text-xs w-10 h-10 hover:bg-[#008485] hover:text-white flex items-center justify-center"
            onClick={handleZoomOut}
          >
            <FaMinus />
          </button>
          <button
            className="flex justify-center items-center w-10 h-10 bg-white text-[#008485] font-semibold rounded-lg hover:bg-[#008485] hover:text-white transition-colors"
            onClick={handleLocateMe}
          >
            <FaLocationCrosshairs />
          </button>
        </div>
        <NaverMap
          ref={mapRef}
          mapTypeId={mapType}
          zoomControl={false}
          center={new naverMaps.LatLng(center.lat, center.lng)}
          onCenterChanged={handleCenterChanged}
          defaultZoom={zoom}
          onZoomChanged={handleZoomChanged}
          draggable={true}
          pinchZoom={true}
          scrollWheel={true}
          keyboardShortcuts={true}
          disableDoubleTapZoom={false}
          disableDoubleClickZoom={false}
          disableTwoFingerTapZoom={false}
          tileTransition={true}
          minZoom={7}
          maxZoom={21}
          scaleControl={true}
        >
          <MapMarkerCluster onMarkerClick={setSelectedEstate} />
        </NaverMap>
      </MapDiv>
      <div className="hidden xs:block">
        <Navbar state={selectedEstate}>{children}</Navbar>
      </div>

      <div className="block xs:hidden">
        <Footer />
        {children}
      </div>
    </div>
  );
}
