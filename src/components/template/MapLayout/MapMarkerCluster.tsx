import { Overlay, useMap, useNavermaps } from 'react-naver-maps';
import React, { useEffect, useState } from 'react';
import { estateData } from '../../../assets/Dummy.tsx';

export default function MapMarkerCluster({ onMarkerClick }) {
  const naverMaps = useNavermaps();
  const map = useMap();
  const [MarkerClustering, setMarkerClustering] =
    useState<naver.maps.map>(null);

  useEffect(() => {
    let isMounted = true;
    import('../../../assets/MarkerClustering.js'!)
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
      onMarkerClick(true); // 클릭 시 해당 아이템 전달
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
    stylingFunction: (clusterMarker: naver.maps.Map, count: number) => {
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
