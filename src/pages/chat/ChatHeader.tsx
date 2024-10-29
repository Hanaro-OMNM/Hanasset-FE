// ChatHeader.tsx
import { HiBell } from 'react-icons/hi';
import React from 'react';

type ChatHeaderProps = {
  advisorName: string;
  advisorImage: string; // 상담사 이미지 경로를 위한 prop 추가
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  advisorName,
  advisorImage,
}) => {
  return (
    <div className="w-full max-w-md p-3 bg-white justify-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={advisorImage} // 상담사 프로필 사진 경로
            alt="Advisor"
            className="w-6 h-6 rounded-full mr-2" // 크기와 스타일 조정
          />
          <span className="text-md font-bold text-hanaBlack80">
            {advisorName}
          </span>
          <div className="w-2 h-2 rounded-full bg-red-500 mx-2"></div>
        </div>

        <div className="flex items-center">
          <button className="px-2 py-1 text-xs text-white bg-hanaRed80 rounded hover:bg-hanaRed transition duration-150 ease-in-out">
            상담 종료
          </button>
          <button className="ml-2 flex items-center justify-center p-1 text-gray-500 hover:text-gray-700">
            <HiBell className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* 아래에 위치한 수평선 */}
      <hr className="mt-3 border-t border-hanaSilver40" />
    </div>
  );
};

export default ChatHeader;
