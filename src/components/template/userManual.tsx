import ReactDOM from 'react-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import Manual1 from '../../assets/img/manual/1.png';
import Manual2 from '../../assets/img/manual/2.png';
import Manual3 from '../../assets/img/manual/3.png';
import Manual5 from '../../assets/img/manual/4.png';
import Manual4 from '../../assets/img/manual/5.png';
import { modalState } from '../../recoil/userManual/atom';

export default function UserManual() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const goToNextPage = () => {
    setCurrentPage((prev) => {
      if (prev === 5) {
        setIsOpen(false);
        return prev;
      }
      return Math.min(prev + 1, 5);
    });
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <button
        onClick={() => setIsOpen(false)}
        className="text-white top-10 right-10 fixed"
      >
        ✕
      </button>
      {/* 0 */}
      {currentPage === 0 && (
        <div>
          <div className="flex fixed bottom-10 right-10">
            <button disabled={currentPage === 0}>
              <IoIosArrowBack
                className="text-white bg-hanaColor2 h-7 w-7"
                onClick={goToPrevPage}
              />
            </button>
            <button>
              <IoIosArrowForward
                className="text-white bg-hanaColor2  h-7 w-7 animate-glow"
                onClick={goToNextPage}
              />
            </button>
          </div>
        </div>
      )}
      {/* 주소로 골라보기 */}
      {currentPage === 1 && (
        <div className="fixed top-24 left-10 p-1 rounded-3xl bg-gradient-to-r from-hanaGreen to-hanaColor2">
          <div className="rounded-3xl bg-white p-0">
            <img src={Manual1} className="rounded-3xl" />
          </div>
          <div className="absolute top-[-60px] left-0 text-white font-fontMedium">
            <h2>
              1. <span className="text-hanaColor2">주소</span>로 볼 수 있음
            </h2>
          </div>
        </div>
      )}

      {/* 빠른 메뉴 구현중 */}
      {currentPage === 2 && (
        <div className="fixed top-64 left-10 p-1 rounded-3xl bg-gradient-to-r from-hanaGreen to-hanaColor2">
          <img src={Manual2} className="rounded-3xl" />
          <div className="fixed top-7 text-white font-fontMedium">
            <h2>
              1. <span className="text-hanaColor2">하나은행 대출 사이트</span>로
              이동
            </h2>
          </div>
        </div>
      )}

      {/* 지도 */}
      {currentPage === 3 && (
        <div className="fixed top-36 left-0 p-1 rounded-3xl bg-gradient-to-r from-hanaGreen to-hanaColor2">
          <img src={Manual3} className="rounded-3xl" />
        </div>
      )}
      {/* 상담 */}
      {currentPage === 4 && (
        <div className="fixed top-52 left-0 p-1 rounded-3xl bg-gradient-to-r from-hanaGreen to-hanaColor2">
          <img src={Manual4} className="rounded-3xl" />
        </div>
      )}
      {/* 마이홈 */}
      {currentPage === 5 && (
        <div className="fixed top-72 left-0 p-1 rounded-3xl bg-gradient-to-r from-hanaGreen to-hanaColor2">
          <img src={Manual5} className="rounded-3xl" />
        </div>
      )}
      <div className="flex fixed bottom-10 right-10">
        <button disabled={currentPage === 0}>
          <IoIosArrowBack
            className="text-white bg-hanaColor2  h-7 w-7"
            onClick={goToPrevPage}
          />
        </button>
        <button>
          <IoIosArrowForward
            className="text-white bg-hanaColor2  h-7 w-7 animate-glow"
            onClick={goToNextPage}
          />
        </button>
      </div>
    </div>,
    document.body
  );
}
