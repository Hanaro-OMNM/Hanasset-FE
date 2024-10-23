import Logo from '../assets/img/logo.png';
import Profile from '../assets/img/profile_ex.jpg';

export default function Main() {
  return (
    <div className="w-full h-[1024px] relative bg-[#f8fafb]">
      {/* 배경 이미지 */}
      <div className="w-full h-[1028px] left-0 top-0 absolute">
        <img
          className="w-[1440px] h-[1028px] left-0 top-0 absolute"
          src="https://via.placeholder.com/1440x1028"
        />
      </div>

      <div className="w-[590px] h-[1028px] left-[-1px] top-0 absolute">
        <div className="w-[590px] h-[1028px] left-0 top-0 absolute bg-white/75 backdrop-blur-[10px]" />
        <div className="w-[392px] h-[407px] left-[146px] top-[42px] absolute">
          <div className="w-[392px] h-[330px] left-0 top-[77px] absolute">
            <div className="w-[190px] h-32 left-[202px] top-[202px] absolute">
              <div className="w-[101px] h-[41px] left-[69px] top-[75px] absolute text-right text-[#515151] text-[13px] font-medium font-['Noto Sans KR'] tracking-tight">
                신혼 첫 집으로
                <br />
                빌라는 어떤가요?
              </div>
              <div className="w-[157px] h-[47px] left-[13px] top-[16px] absolute">
                <div className="w-[45px] h-[45px] left-[112px] top-[2px] absolute">
                  <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-[#008485] rounded-full" />
                </div>
                <div className="left-0 top-0 absolute text-black text-2xl font-bold font-['Noto Sans KR'] tracking-tight">
                  빌라
                </div>
              </div>
            </div>
            <div className="w-[190px] h-32 left-0 top-[202px] absolute">
              <div className="w-[121px] h-[41px] left-[49px] top-[75px] absolute text-right text-[#515151] text-[13px] font-medium font-['Noto Sans KR'] tracking-tight">
                혼자서도 괜찮아!
                <br />
                좁다면 투룸은 어때?
              </div>
              <div className="w-[157px] h-[47px] left-[13px] top-[16px] absolute">
                <div className="w-[45px] h-[45px] left-[112px] top-[2px] absolute">
                  <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-[#abcec8] rounded-full" />
                </div>
                <div className="left-0 top-0 absolute text-black text-2xl font-bold font-['Noto Sans KR'] tracking-tight">
                  원룸/투룸
                </div>
              </div>
            </div>
            <div className="w-[190px] h-32 left-[202px] top-[54px] absolute">
              <div className="w-[141px] h-[41px] left-[29px] top-[75px] absolute text-right text-[#515151] text-[13px] font-medium font-['Noto Sans KR'] tracking-tight">
                요즘 다들 오피스텔 산대
                <br />이 참에 나도?
              </div>
              <div className="w-[157px] h-[47px] left-[13px] top-[16px] absolute">
                <div className="w-[45px] h-[45px] left-[112px] top-[2px] absolute">
                  <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-[#5d9588] rounded-full" />
                </div>
                <div className="left-0 top-0 absolute text-black text-2xl font-bold font-['Noto Sans KR'] tracking-tight">
                  오피스텔
                </div>
              </div>
            </div>
            <div className="w-[190px] h-32 left-0 top-[54px] absolute">
              <div className="w-[134px] h-[41px] left-[36px] top-[75px] absolute text-right text-[#515151] text-[13px] font-medium font-['Noto Sans KR'] tracking-tight">
                아무도 없는, 아무도 없는 쓸쓸한 너의 아파트, 흠흠
              </div>
              <div className="w-[157px] h-[47px] left-[13px] top-[16px] absolute">
                <div className="w-[45px] h-[45px] left-[112px] top-[2px] absolute">
                  <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-[#008485] rounded-full" />
                </div>
                <div className="left-0 top-0 absolute text-black text-2xl font-bold font-['Noto Sans KR'] tracking-tight">
                  APT
                </div>
              </div>
            </div>
            <div className="left-0 top-0 absolute text-black text-xl font-bold font-['Noto Sans KR'] tracking-tight">
              카테고리 별 골라보기
            </div>
          </div>
          <div className="w-[392px] h-[52px] left-0 top-0 absolute">
            <div className="w-[392px] h-[52px] left-0 top-0 absolute bg-white rounded-xl shadow border border-[#ecedf6]" />
            <div className="w-6 h-6 left-[354px] top-[14px] absolute justify-center items-center inline-flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="h-6 left-[15px] top-[14px] absolute justify-start items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 relative" />
              <div className="text-[#c4c4c4] text-base font-normal font-['Noto Sans KR'] tracking-tight">
                아파트 이름 검색
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="w-[85px] h-full left-0 top-0 p-4 absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center justify-between">
          {/* 로고 이미지 */}
          <div className="w-[59px] h-[79.54px] mt-4 flex flex-col items-center justify-center">
            <img className="w-[54px] h-[50.34px]" src={Logo} />
            <div className="w-[53px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              OMNM
            </div>
          </div>

          <div className="w-[58px] h-[301.04px] flex flex-col items-center justify-between">
            <div className="w-[58px] h-[86.59px] flex flex-col items-center">
              <div className="w-[58px] h-[58.40px] bg-[#008485] rounded-lg shadow flex items-center justify-center" />
              <div className="w-[15px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center mt-2">
                홈
              </div>
            </div>

            <div className="w-[45px] h-[61.42px] flex flex-col items-center">
              <div className="w-[30px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
                지도
              </div>
            </div>

            <div className="w-[45px] h-[66.45px] flex flex-col items-center">
              <div className="w-[45px] text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
                마이홈
              </div>
            </div>
          </div>

          <div className="w-[52px] h-[52.35px] mb-4">
            <img className="w-full h-full rounded-full" src={Profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
