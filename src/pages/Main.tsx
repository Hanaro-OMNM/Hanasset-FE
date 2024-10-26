import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useMap,
} from 'react-naver-maps';
import { useState, useCallback, CSSProperties, useEffect } from 'react';
import { accidentDeath } from '../assets/Dummy.tsx';

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
  const navermaps = useNavermaps();
  const [zoom, setZoom] = useState(13);
  const [draggable, setDraggable] = useState(true);
  const [disableKineticPan, setDisableKineticPan] = useState(true);
  const [tileTransition, setTileTransition] = useState(true);
  const [minZoom, setMinZoom] = useState(7);
  const [scaleControl, setScaleControl] = useState(true);
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

  const normalBtnStyle: CSSProperties = {
    backgroundColor: '#fff',
    border: 'solid 1px #333',
    outline: 'none',
    borderRadius: '5px',
    boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.5)',
    margin: '0 5px 5px 0',
    padding: '5px 10px',
  };

  const selectedBtnStyle: CSSProperties = {
    ...normalBtnStyle,
    backgroundColor: '#2780E3',
    color: 'white',
  };

  return (
    <MapDiv style={{ position: 'relative', width: '100%', height: '700px' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1000,
          padding: 5,
        }}
      >
        <button style={normalBtnStyle} onClick={handleLocateMe}>
          현재 위치로 이동
        </button>
        <button
          style={draggable ? selectedBtnStyle : normalBtnStyle}
          onClick={() => setDraggable((prev) => !prev)}
        >
          지도 인터렉션
        </button>
        <button
          style={!disableKineticPan ? selectedBtnStyle : normalBtnStyle}
          onClick={() => setDisableKineticPan((prev) => !prev)}
        >
          관성 드래깅
        </button>
        <button
          style={tileTransition ? selectedBtnStyle : normalBtnStyle}
          onClick={() => setTileTransition((prev) => !prev)}
        >
          타일 fadeIn 효과
        </button>
        <button
          style={scaleControl ? selectedBtnStyle : normalBtnStyle}
          onClick={() => setScaleControl((prev) => !prev)}
        >
          모든 지도 컨트롤
        </button>
        <button
          style={normalBtnStyle}
          onClick={() => setMinZoom((prev) => (prev === 10 ? 7 : 10))}
        >
          최소/최대 줌 레벨: {minZoom} ~ 21
        </button>
      </div>

      <NaverMap
        zoomControlOptions={{ position: navermaps.Position.TOP_RIGHT }}
        center={center}
        defaultZoom={zoom}
        onZoomChanged={handleZoomChanged}
        draggable={draggable}
        pinchZoom={draggable}
        scrollWheel={draggable}
        keyboardShortcuts={draggable}
        disableDoubleTapZoom={!draggable}
        disableDoubleClickZoom={!draggable}
        disableTwoFingerTapZoom={!draggable}
        disableKineticPan={disableKineticPan}
        tileTransition={tileTransition}
        minZoom={minZoom}
        maxZoom={21}
        scaleControl={scaleControl}
        logoControl={scaleControl}
        mapDataControl={scaleControl}
        mapTypeControl={scaleControl}
        zoomControl={scaleControl}
      >
        <MarkerCluster />
      </NaverMap>
    </MapDiv>
  );
}
