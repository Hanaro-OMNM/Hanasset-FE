// Panel.tsx
import { useNavermaps } from 'react-naver-maps';
import googleMap from '../../../assets/img/mapCompanyType/구글 지도.png';
import naverMap from '../../../assets/img/mapCompanyType/네이버 지도.png';
import kakaoMap from '../../../assets/img/mapCompanyType/카카오 지도.png';
import satellite from '../../../assets/img/mapType/위성지도.png';
import general from '../../../assets/img/mapType/일반지도.png';
import topographic from '../../../assets/img/mapType/지형지도.png';

interface PanelProps {
  showControlPanel: boolean;
  mapType: string;
  setMapType: (type: string) => void;
}

export default function MapPanel({
  showControlPanel,
  mapType,
  setMapType,
}: PanelProps) {
  const naverMaps = useNavermaps();

  const handleChangeMapType = (type: string) => {
    setMapType(type);
  };

  if (!showControlPanel) return null;

  return (
    <div className="w-[400px]">
      <div className="top-0 absolute animate-slideInRight">
        <div className="w-[384px] bg-white absolute shadow-md mr-[10px] rounded-lg p-4">
          {/* 지도 유형 */}
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
                onClick={() => handleChangeMapType(naverMaps.MapTypeId.NORMAL)}
              >
                <img className="w-full rounded-xl" src={general} alt="logo" />
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
                <img className="w-full rounded-xl" src={satellite} alt="logo" />
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
                onClick={() => handleChangeMapType(naverMaps.MapTypeId.TERRAIN)}
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

          {/* 지도 바로가기 */}
          <h3 className="text-lg font-semibold text-gray-700 my-4">
            지도 바로가기
          </h3>
          <div className="space-y-2">
            <div className="flex space-x-10 justify-center">
              <div className="flex flex-col items-center">
                <button
                  className="relative w-12 h-12 rounded-xl border transition-colors"
                  onClick={() => window.open('https://map.naver.com', '_blank')}
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
                  className="relative w-12 h-12 rounded-xl border transition-colors"
                  onClick={() => window.open('https://map.kakao.com', '_blank')}
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
                  className="relative w-12 h-12 rounded-xl border transition-colors"
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
          <div className="pt-8 flex flex-col space-y-2">
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
      </div>
    </div>
  );
}
