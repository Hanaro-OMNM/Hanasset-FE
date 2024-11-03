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
          className={`p-3 max-w-64 rounded-lg text-xs  ${
            isSender ? 'slide-in-right' : 'slide-in-left'
          } ${isSender ? 'bg-hanaGreen80 text-white' : 'bg-hanaGreen40'}`}
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
