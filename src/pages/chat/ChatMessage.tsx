import React, { useRef, useEffect } from 'react';

type ChatMessageProps = {
  subject: 'sender' | 'responser';
  message: string;
  lastMessageTime?: string | null;
  responserName?: string;
  responserImage?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  subject,
  message,
  lastMessageTime,
  responserName,
  responserImage,
}) => {
  const isSender = subject === 'sender';
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageElement = messageRef.current;

    if (messageElement) {
      // 애니메이션 클래스를 추가합니다.
      messageElement.classList.add(
        isSender ? 'slide-in-right' : 'slide-in-left'
      );

      // 애니메이션이 끝난 후 클래스 제거
      const handleAnimationEnd = () => {
        messageElement.classList.remove(
          isSender ? 'slide-in-right' : 'slide-in-left'
        );
      };

      messageElement.addEventListener('animationend', handleAnimationEnd);

      // 이벤트 클린업
      return () => {
        messageElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [isSender]);

  return (
    <div
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} items-end`}
    >
      {isSender && lastMessageTime && (
        <span className="mr-1 text-[10px] text-gray-400">
          {lastMessageTime}
        </span>
      )}

      <div
        className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}
      >
        <div
          className={`flex mb-1 ${isSender ? 'flex-row-reverse' : 'flex-row'} items-center`}
        >
          {!isSender && responserImage && (
            <img
              src={responserImage}
              alt="responser"
              className="w-6 h-6 rounded-full mr-2"
            />
          )}
          {!isSender && responserName && (
            <span className="text-hanaGreen text-xs font-bold">
              {responserName}
            </span>
          )}
        </div>
        <div
          ref={messageRef} // useRef로 요소를 참조합니다.
          className={`p-3 max-w-64 rounded-lg shadow-sm text-xs ${
            isSender ? 'bg-hanaGreen80 text-white' : 'bg-hanaGreen40'
          }`}
          style={{
            borderRadius: isSender ? '15px 15px 0 15px' : '15px 15px 15px 0',
          }}
        >
          <p>{message}</p>
        </div>
      </div>

      {!isSender && lastMessageTime && (
        <span className="ml-1 text-[10px] text-gray-400">
          {lastMessageTime}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
