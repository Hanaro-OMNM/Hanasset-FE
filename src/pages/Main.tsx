import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useMap,
} from 'react-naver-maps';
import { useState, useCallback, useRef, useEffect, CSSProperties } from 'react';
import { accidentDeath } from '../assets/Dummy.tsx';
import googleMap from '../assets/img/mapCompanyType/구글 지도.png';
import naverMap from '../assets/img/mapCompanyType/네이버 지도.png';
import kakaoMap from '../assets/img/mapCompanyType/카카오 지도.png';
import satellite from '../assets/img/mapType/위성지도.png';
import general from '../assets/img/mapType/일반지도.png';
import topographic from '../assets/img/mapType/지형지도.png';
import Navbar from '../components/template/Navbar';

function MarkerCluster() {
  const navermaps = useNavermaps();
  const map = useMap();
  const [MarkerClustering, setMarkerClustering] = useState<any>(null);

  // 동적 import로 makeMarkerClustering을 한 번만 불러오도록 설정
  useEffect(() => {
    let isMounted = true;
    import('../assets/MarkerClustering.js')
      .then((module) => {
        if (isMounted) {
          setMarkerClustering(() => module.makeMarkerClustering(window.naver));
        }
      })
      .catch((error) =>
        console.error('Failed to load MarkerClustering module', error)
      );

    return () => {
      isMounted = false;
    };
  }, []);

  // MarkerClustering이 로드될 때까지 컴포넌트 렌더링을 중단
  if (!MarkerClustering) return null;

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };

  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  };

  const data = accidentDeath.searchResult.accidentDeath;
  const markers = data.map(
    (spot) =>
      new naver.maps.Marker({
        position: new naver.maps.LatLng(spot.grd_la, spot.grd_lo),
        draggable: true,
      })
  );

  const cluster = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 8,
    map,
    markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: (clusterMarker, count) => {
      clusterMarker.getElement().querySelector('div:first-child').innerText =
        count;
    },
  });

  return <Overlay element={cluster} />;
}

export default function Main() {
  const naverMaps = useNavermaps();
  const mapRef = useRef(null);

  const [showControlPanel, setShowControlPanel] = useState(false);
  const [mapType, setMapType] = useState(naverMaps.MapTypeId.NORMAL);

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

  const handleChangeMapType = (type: string) => {
    setMapType(type);
  };

  const navermaps = useNavermaps();
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState(
    new navermaps.LatLng(37.3595704, 127.105399)
  );

  const handleZoomChanged = useCallback((newZoom: number) => {
    console.log(`zoom: ${newZoom}`);
    setZoom(newZoom);
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter(new navermaps.LatLng(latitude, longitude));
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
          {showControlPanel ? (
            <div
              className={`w-96 bg-white shadow-md rounded-lg p-4 transform transition-all duration-300 ease-in-out opacity-100 scale-100`}
              style={{ marginRight: '10px' }}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                지도 유형
              </h3>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button
                    className={`relative w-full h-full rounded-xl border transition-colors ${
                      mapType === naverMaps.MapTypeId.NORMAL
                        ? 'border-2 border-blue-600'
                        : ''
                    }`}
                    onClick={() =>
                      handleChangeMapType(naverMaps.MapTypeId.NORMAL)
                    }
                  >
                    <img
                      className="w-full rounded-xl"
                      src={general}
                      alt="logo"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-base">
                      일반지도
                    </div>
                  </button>
                  <button
                    className={`relative w-full h-full rounded-xl border transition-colors ${
                      mapType === naverMaps.MapTypeId.SATELLITE
                        ? 'border-2 border-blue-600'
                        : ''
                    }`}
                    onClick={() =>
                      handleChangeMapType(naverMaps.MapTypeId.SATELLITE)
                    }
                  >
                    <img
                      className="w-full rounded-xl"
                      src={satellite}
                      alt="logo"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">
                      위성지도
                    </div>
                  </button>

                  <button
                    className={`relative w-full h-full rounded-xl border transition-colors ${
                      mapType === naverMaps.MapTypeId.TERRAIN
                        ? 'border-2 border-blue-600'
                        : ''
                    }`}
                    onClick={() =>
                      handleChangeMapType(naverMaps.MapTypeId.TERRAIN)
                    }
                  >
                    <img
                      className="w-full rounded-xl"
                      src={topographic}
                      alt="logo"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-base">
                      지형지도
                    </div>
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-700 my-4">
                지도 바로가기
              </h3>
              <div className="space-y-2">
                <div className="flex space-x-10 justify-center">
                  <div className="flex flex-col items-center">
                    <button
                      className={`relative w-12 h-12 rounded-xl border transition-colors`}
                      onClick={() =>
                        window.open('https://map.naver.com', '_blank')
                      }
                    >
                      <img
                        className="w-full h-full rounded-xl"
                        src={naverMap}
                        alt="logo"
                      />
                    </button>
                    <span className="text-center mt-2 text-xs">네이버지도</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      className={`relative w-12 h-12 rounded-xl border transition-colors`}
                      onClick={() =>
                        window.open('https://map.kakao.com', '_blank')
                      }
                    >
                      <img
                        className="w-full h-full rounded-xl"
                        src={kakaoMap}
                        alt="logo"
                      />
                    </button>
                    <span className="text-center mt-2 text-xs">카카오맵</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      className={`relative w-12 h-12 rounded-xl border transition-colors`}
                      onClick={() =>
                        window.open('https://www.google.com/maps', '_blank')
                      }
                    >
                      <img
                        className="w-full h-full rounded-xl"
                        src={googleMap}
                        alt="logo"
                      />
                    </button>
                    <span className="text-center mt-2 text-xs">구글맵</span>
                  </div>
                </div>
              </div>
              <div className="py-8 flex flex-col space-y-2">
                <hr className="border-t border-gray-300" />
                <button
                  className="w-full py-2 bg-white text-black rounded-lg transition-colors"
                  onClick={() =>
                    window.open(
                      'https://data.kbland.kr/publicdata/real-estate-policy',
                      '_blank'
                    )
                  }
                >
                  규제지역 안내 바로가기
                </button>
                <hr className="border-t border-gray-300" />
                <button
                  className="w-full py-2 bg-white text-black rounded-lg transition-colors"
                  onClick={() =>
                    window.open(
                      'https://www.k-pis.go.kr/addMapView.do?ctprvnCode=41&signguCode=41171&emdCode=41171000&pnuCode=41171000&pageNo=1&serKnd=pnsq&homeMet=home',
                      '_blank'
                    )
                  }
                >
                  국유재산 바로가기
                </button>
                <hr className="border-t border-gray-300" />
              </div>
            </div>
          ) : (
            <div className="opacity-0 scale-95"></div>
          )}
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
          center={center}
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
          minZoom={5}
          maxZoom={21}
          scaleControl={true}
        >
          <MarkerCluster />
        </NaverMap>
      </MapDiv>
      <Navbar />
    </div>
  );
}
