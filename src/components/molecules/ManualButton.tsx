import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface ManualButtonProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
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
        <div
          className={`flex mr-5 ${
            currentPage === 0 ? 'text-hanaSilver80' : ' text-white'
          }`}
        >
          <IoIosArrowBack
            className={`h-7 w-7 ${
              currentPage === 0 ? 'text-hanaSilver80' : 'text-white'
            }`}
          />
          이전
        </div>
      </button>

      <button disabled={currentPage === totalPages - 1} onClick={onNext}>
        <div
          className={`flex ${
            currentPage === totalPages - 2
              ? 'text-hanaSilver80'
              : 'animate-glow text-white'
          }`}
        >
          다음
          <IoIosArrowForward
            className={`h-7 w-7 ${
              currentPage === totalPages - 2
                ? 'text-hanaSilver80'
                : 'animate-glow text-white'
            }`}
          />
        </div>
      </button>
    </div>
  );
}
