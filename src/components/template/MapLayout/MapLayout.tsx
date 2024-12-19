import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from 'react-naver-maps';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import centerAtom from '../../../recoil/center/index.ts';
import { CurrentMarkers } from '../../../types/hanaAssetResponse.common.ts';
import Footer from '../Footer.tsx';
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
  const [markers, setMarkers] = useState<CurrentMarkers | null>(null);
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

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const currentMarkers = await PlatformAPI.getClusteringInfo({
          lat: center.lat,
          lng: center.lng,
          zoom: zoom,
        });
        setMarkers(currentMarkers);
      } catch (error) {
        console.error('Error fetching clustering info:', error);
      }
    };
    fetchMarkers();
  }, [center, zoom]);

  console.log(markers, zoom);

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
          maxZoom={17}
          scaleControl={true}
        >
          {markers?.result.markerInfos ? (
            markers?.result.markerInfos.map((marker) => (
              <Marker
                key={marker.cortarNoCode}
                position={
                  new naverMaps.LatLng(marker.centerLat, marker.centerLng)
                }
                title={marker.name.split(' ').pop()}
                icon={{
                  content: `
                    <div style="
                      background: #2D4E6F;
                      width: 50px;
                      height: 50px;
                      border-radius: 10px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-size: 10px;
                      font-weight: bold;
                      transition: transform 0.3s ease;
                      text-align: center;
                    ">
                    <div style="background: #FFFFFF; color: #2D4E6F; border-radius: 5px; padding: 2px 5px;">
                      ${marker.name.split(' ').pop()}
                    </div>
                  </div>
                 `,
                  size: naverMaps.Size(50, 50),
                  anchor: naverMaps.Point(25, 25),
                }}
                onClick={() => {
                  setCenter({ lat: marker.centerLat, lng: marker.centerLng });
                  handleZoomIn();
                }}
              />
            ))
          ) : (
            <></>
          )}
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
