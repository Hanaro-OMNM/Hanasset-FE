import React from 'react';

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

  return (
    <div
      className={`flex ${isSender ? 'justify-end' : 'justify-start'}  items-end`}
    >
      {/* 시간 표시 (sender일 때 왼쪽, 시간이 변했을 때만 표시) */}
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
          {/* responser 프로필 사진 */}
          {!isSender && responserImage && (
            <img
              src={responserImage}
              alt="responser"
              className="w-6 h-6 rounded-full mr-2"
            />
          )}

          {/* responser 이름 표시 */}
          {!isSender && responserName && (
            <span className="text-hanaGreen text-xs font-bold">
              {responserName}
            </span>
          )}
        </div>
        <div
          className={`p-3 max-w-64 rounded-lg text-xs ${
            isSender ? 'bg-hanaGreen80 text-white' : 'bg-hanaGreen40'
          }`}
          style={{
            borderRadius: isSender ? '15px 15px 0 15px' : '15px 15px 15px 0',
          }}
        >
          <p>{message}</p>
        </div>
      </div>

      {/* 시간 표시 (responser일 때 오른쪽, 시간이 변했을 때만 표시) */}
      {!isSender && lastMessageTime && (
        <span className="ml-1 text-[10px] text-gray-400">
          {lastMessageTime}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
