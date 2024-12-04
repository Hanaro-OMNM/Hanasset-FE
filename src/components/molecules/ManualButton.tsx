import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface ManualButtonProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string; // className 추가
}

export default function ManualButton({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  className = '',
}: ManualButtonProps) {
  return (
    <div className={`flex ${className}`}>
      <button disabled={currentPage === 0} onClick={onPrev}>
        <div className="flex text-white mr-5">
          <IoIosArrowBack className="text-white h-7 w-7" />
          이전
        </div>
      </button>
      <button disabled={currentPage === totalPages - 1} onClick={onNext}>
        <div className="flex text-white animate-glow">
          다음
          <IoIosArrowForward className="text-white h-7 w-7 animate-glow" />
        </div>
      </button>
    </div>
  );
}
