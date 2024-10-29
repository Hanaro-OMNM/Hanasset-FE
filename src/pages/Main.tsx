import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useMap,
} from 'react-naver-maps';
import { useState, useCallback, useRef, useEffect } from 'react';
import { accidentDeath } from '../assets/Dummy.tsx';
import googleMap from '../assets/img/mapCompanyType/구글 지도.png';
import naverMap from '../assets/img/mapCompanyType/네이버 지도.png';
import kakaoMap from '../assets/img/mapCompanyType/카카오 지도.png';
import satellite from '../assets/img/mapType/위성지도.png';
import general from '../assets/img/mapType/일반지도.png';
import topographic from '../assets/img/mapType/지형지도.png';
import { Navbar } from '../components/template/Navbar';

function MarkerCluster({ zoomLevel, onMarkerClick }) {
  const naverMaps = useNavermaps();
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

  const hanaGreenGradient = 'linear-gradient(135deg, #3DA35D, #6DCE97)'; // hanaGreen 색상 그라디언트

  const htmlMarker1 = {
    content: `<div style="cursor:pointer;width:45px;height:45px;line-height:45px;font-size:11px;color:white;text-align:center;font-weight:bold;border-radius:50%;background:${hanaGreenGradient};"></div>`,
    size: naverMaps.Size(45, 45),
    anchor: naverMaps.Point(22, 22),
  };

  const htmlMarker2 = {
    content: `<div style="cursor:pointer;width:50px;height:50px;line-height:50px;font-size:12px;color:white;text-align:center;font-weight:bold;border-radius:50%;background:${hanaGreenGradient};"></div>`,
    size: naverMaps.Size(50, 50),
    anchor: naverMaps.Point(25, 25),
  };

  const htmlMarker3 = {
    content: `<div style="cursor:pointer;width:55px;height:55px;line-height:55px;font-size:13px;color:white;text-align:center;font-weight:bold;border-radius:50%;background:${hanaGreenGradient};"></div>`,
    size: naverMaps.Size(55, 55),
    anchor: naverMaps.Point(27, 27),
  };

  const htmlMarker4 = {
    content: `<div style="cursor:pointer;width:60px;height:60px;line-height:60px;font-size:14px;color:white;text-align:center;font-weight:bold;border-radius:50%;background:${hanaGreenGradient};"></div>`,
    size: naverMaps.Size(60, 60),
    anchor: naverMaps.Point(30, 30),
  };

  const htmlMarker5 = {
    content: `<div style="cursor:pointer;width:65px;height:65px;line-height:65px;font-size:15px;color:white;text-align:center;font-weight:bold;border-radius:50%;background:${hanaGreenGradient};"></div>`,
    size: naverMaps.Size(65, 65),
    anchor: naverMaps.Point(32, 32),
  };

  const markers = estateData.map((item) => {
    const priceText =
      item.prc >= 10000
        ? `${Math.floor(item.prc / 10000)}억`
        : `${item.prc}만원`;

    const marker = new naverMaps.Marker({
      position: new naverMaps.LatLng(item.lat, item.lng),
      title: `${item.tradTpNm} ${item.prc}만원`,
      icon: {
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
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <div style="
          background: #FFFFFF;
          color: #2D4E6F;
          border-radius: 5px;
          padding: 2px 5px;
          font-size: 10px;
          font-weight: bold;
        ">
          ${item.tradTpNm}
        </div>
        <div style="margin-top: 4px;">
          ${priceText}
        </div>
      </div>`,
        size: naverMaps.Size(50, 50),
        anchor: naverMaps.Point(25, 25),
      },
      map: null,
    });

    // onClick 이벤트 추가
    marker.addListener('click', () => {
      onMarkerClick(item); // 클릭 시 해당 아이템 전달
    });

    return marker;
  });

  const cluster = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 21,
    map,
    markers,
    disableClickZoom: false,
    gridSize: 1000,
    icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
    indexGenerator: [5, 20, 50, 100, 250, 500],
    stylingFunction: (clusterMarker: any, count: number) => {
      const clusterContent = clusterMarker.getElement();

      // clusterContent가 null이 아닌지 확인
      if (clusterContent) {
        const firstChild = clusterContent.querySelector('div:first-child');

        // firstChild가 존재하는 경우에만 innerText 설정
        if (firstChild) {
          firstChild.innerText = count.toString();
          const size =
            count < 20 ? 40 : count < 50 ? 50 : count < 100 ? 60 : 70;

          firstChild.style.width = `${size}px`;
          firstChild.style.height = `${size}px`;
          firstChild.style.lineHeight = `${size}px`;
          firstChild.style.fontSize =
            count < 20 ? '12px' : count < 50 ? '14px' : '16px';
          firstChild.style.backgroundColor =
            count < 20 ? 'lightblue' : count < 50 ? 'lightgreen' : 'lightcoral';
        }
      }
    },
  });

  return <Overlay element={cluster} />;
}

export default function Main() {
  const naverMaps = useNavermaps();
  const mapRef = useRef<naver.maps.Map | null>(null);

  const [showControlPanel, setShowControlPanel] = useState(false);
  const [mapType, setMapType] = useState(naverMaps.MapTypeId.NORMAL);
  const [selectedEstate, setSelectedEstate] = useState(false); // 선택된 매물 상태

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

  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState(
    new naverMaps.LatLng(37.3595704, 127.105399)
  );

  const handleZoomChanged = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter(new naverMaps.LatLng(latitude, longitude));
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
          minZoom={7}
          maxZoom={21}
          scaleControl={true}
        >
          <MarkerCluster zoomLevel={zoom} onMarkerClick={setSelectedEstate} />
        </NaverMap>
      </MapDiv>
      <Navbar state={selectedEstate} />
    </div>
  );
}
