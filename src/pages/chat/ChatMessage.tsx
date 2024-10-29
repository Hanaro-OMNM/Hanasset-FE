// ChatMessage.tsx
import React from 'react';

type ChatMessageProps = {
  sender: 'user' | 'bot';
  message: string;
  lastMessageTime?: string | null; // 표시할 시간
  advisorName?: string; // 상담사 이름 prop 추가
  advisorImage?: string; // 상담사 이미지 경로 prop 추가
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  lastMessageTime,
  advisorName, // 상담사 이름 prop
  advisorImage, // 상담사 이미지 prop
}) => {
  const isUser = sender === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}  items-end`}
    >
      {/* 시간 표시 (user일 때 왼쪽, 시간이 변했을 때만 표시) */}
      {isUser && lastMessageTime && (
        <span className="mr-1 text-[10px] text-gray-400">
          {lastMessageTime}
        </span>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`flex mb-1 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-center`}
        >
          {/* 상담사 프로필 사진 */}
          {!isUser && advisorImage && (
            <img
              src={advisorImage} // 상담사 프로필 사진 경로
              alt="Advisor"
              className="w-6 h-6 rounded-full mr-2" // 크기와 스타일 조정
            />
          )}

          {/* 상담사 이름 표시 (bot일 때) */}
          {!isUser && advisorName && (
            <span className="text-hanaGreen text-xs font-bold">
              {advisorName}
            </span>
          )}
        </div>
        <div
          className={`p-3 max-w-64 rounded-lg text-xs ${
            isUser ? 'bg-hanaGreen80 text-white' : 'bg-hanaGreen40'
          }`}
          style={{
            borderRadius: isUser ? '15px 15px 0 15px' : '15px 15px 15px 0',
          }}
        >
          <p>{message}</p>
        </div>
      </div>

      {/* 시간 표시 (bot일 때 오른쪽, 시간이 변했을 때만 표시) */}
      {!isUser && lastMessageTime && (
        <span className="ml-1 text-[10px] text-gray-400">
          {lastMessageTime}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
