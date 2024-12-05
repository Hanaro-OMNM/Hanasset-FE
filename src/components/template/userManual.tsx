import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Manual1 from '../../assets/img/manual/1.png';
import Manual2 from '../../assets/img/manual/2.png';
import Manual3 from '../../assets/img/manual/3.png';
import Manual4 from '../../assets/img/manual/4.png';
import Manual5 from '../../assets/img/manual/5.png';
import CloseButton from '../atoms/CloseButton';
import ManualImg from '../atoms/ManualImg';
import ManualTitle from '../atoms/ManualTitle';
import ManualButton from '../molecules/ManualButton';

interface userManualProps {
  close: () => void;
}
export default function UserManual({ close }: userManualProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    setCurrentPage((prev) => {
      if (prev === 4) {
        close();
      }
      return prev + 1;
    });
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const animationVariants = {
    hidden: { opacity: 0, translateY: 5 },
    visible: { opacity: 1, translateY: 0 },
    exit: { opacity: 0, translateY: -5 },
  };

  const pages = [
    {
      content: (
        <motion.div
          key="page1"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <CloseButton onClick={close} />
          <ManualImg className="top-24 left-10">
            <img alt="Manual1" src={Manual1} className="rounded-3xl" />
          </ManualImg>
          <div className="fixed top-12 left-10">
            1.
            <ManualTitle text="원하는 매물을 더 빠르게 찾아보세요!" />
          </div>
          <div className="text-white font-fontLight text-xl fixed top-80 left-10">
            <div className="mb-4">
              1. <span className="text-ManualColor3">주소로 골라보기</span>에서
              <span className="text-ManualColor1">
                {' '}
                시/도, 시/군/구, 읍/면/동
              </span>
              을 단계적으로 선택해보세요.
            </div>
            <div>
              2. 지도에서{' '}
              <span className="text-ManualColor2">원하는 위치를 클릭</span>하여
              해당 지역 매물을 확인할 수 있습니다.
            </div>
          </div>
          <div className="fixed top-96 mt-8 left-10 mr-3 text-hanaSilver">
            1/5
          </div>
          <ManualButton
            currentPage={currentPage}
            totalPages={6}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
            className="fixed top-96 left mt-8"
          />
        </motion.div>
      ),
    },
    {
      content: (
        <motion.div
          key="page2"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <CloseButton onClick={close} />
          <ManualImg className="top-64 left-10">
            <img alt="Manual2" src={Manual2} className="rounded-3xl" />
          </ManualImg>
          <div className="fixed top-52 left-10">
            1.
            <ManualTitle text="빠른 메뉴로 바로 이동하세요!" />
          </div>
          <div className="text-white font-fontLight text-xl fixed top-72">
            <div className="mb-4">
              1.
              <span className="text-ManualColor3"> 클릭 한 번</span>
              <span>으로 </span>
              <span className="text-ManualColor1">
                하나은행 대출 관련 사이트
              </span>
              로 이동합니다.
            </div>
            <div className="mb-4">
              2.
              <span className="text-ManualColor2"> 지원 정책</span>을 확인하고
              신청해보세요.
            </div>
            <div>
              3. Hana Asset의 사용법을
              <span className="text-ManualColor2"> 한 눈에</span> 알아볼 수
              있습니다.
            </div>
          </div>
          <div className="fixed bottom-80 mb-10 left-1/3 ml-14 text-hanaSilver">
            2/5
          </div>
          <ManualButton
            currentPage={currentPage}
            totalPages={6}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
            className="fixed bottom-80 mb-10 right-1/4"
          />
        </motion.div>
      ),
    },
    {
      content: (
        <motion.div
          key="page3"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <CloseButton onClick={close} />
          <ManualImg className="top-36 left-0">
            <img alt="Manual3" src={Manual3} className="rounded-3xl" />
          </ManualImg>
          <div className="absolute top-40 left-24 text-white font-fontMedium">
            <div>
              <ManualTitle text="지도에서 지역별 매물을 한눈에 확인해보세요" />
            </div>
          </div>
          <div className="fixed top-52 left-24 text-hanaSilver">3/5</div>
          <ManualButton
            currentPage={currentPage}
            totalPages={6}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
            className="fixed top-52 left-1/3"
          />
        </motion.div>
      ),
    },
    {
      content: (
        <motion.div
          key="page4"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <CloseButton onClick={close} />
          <ManualImg className="top-52 left-0">
            <img alt="Manual4" src={Manual4} className="rounded-3xl" />
          </ManualImg>
          <div className="absolute top-52 left-24 text-white font-fontMedium">
            <div>
              <ManualTitle text="궁금한 매물에 대해 상담사와 실시간 채팅을 시작하세요." />
            </div>
            <div className="text-white font-fontLight text-xl fixed top-64">
              선택한 매물의 정보, 계약 조건 등
              <span className="text-ManualColor1"> 궁금한 사항</span>을 상담사와
              <span className="text-ManualColor3"> 직접 </span>소통하며 해결할
              수 있습니다.
            </div>
          </div>
          <div className="fixed top-72 mt-4 left-24 text-hanaSilver">4/5</div>
          <ManualButton
            currentPage={currentPage}
            totalPages={6}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
            className="fixed top-72 mt-4 left-auto"
          />
        </motion.div>
      ),
    },
    {
      content: (
        <motion.div
          key="page5"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <CloseButton onClick={close} />
          <ManualImg className="top-72 left-0">
            <img alt="Manual5" src={Manual5} className="rounded-3xl" />
          </ManualImg>
          <div className="absolute top-72 left-24 text-white font-fontMedium">
            <div>
              <ManualTitle text="내 정보 무라고 적지" />
            </div>
            <div className="text-white font-fontLight text-xl fixed top-80 mt-2">
              <span>1. </span>
              <span className="text-ManualColor3">내 정보</span>를 관리하고,
              관심 있는 지역과 매물을 한눈에 확인할 수 있는 공간입니다.
            </div>
            <div className="text-white font-fontLight text-xl fixed top-80 mt-12">
              <span>2. </span>
              <span className="text-ManualColor2">관심 지역 및 매물</span>을
              확인할 수 있습니다.
            </div>
          </div>
          <div className="fixed top-96 mt-5 left-28 text-hanaSilver">5/5</div>
          <ManualButton
            currentPage={currentPage}
            totalPages={6}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
            className="fixed top-96 mt-5 left-auto"
          />
        </motion.div>
      ),
    },
  ];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <AnimatePresence mode="wait">
        {pages[currentPage]?.content}
      </AnimatePresence>
    </div>,
    document.body
  );
}
