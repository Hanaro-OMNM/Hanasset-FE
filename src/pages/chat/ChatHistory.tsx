import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import GuestChatDetail from '../GuestChatDetail';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  messageType: string;
  chatroomId: string;
  senderId: number;
  content: string;
  accessor: string;
  createdAt: string;
};

export default function ChatHistoryPage() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await PlatformAPI.getChatroomMessagesByChatroomId(
        searchParams.get('chatroomId') as string
      );
      if (Array.isArray(response)) {
        setMessages(response);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    setInputValue('');
  };

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="flex flex-col h-screen w-full min-w-[420px]">
        <ChatHeader
          responserName="하나은행 상담사"
          responserImage={logo}
          isHistory={false}
        />
        <div className="flex-1 w-full px-4 md:px-8 py-4 bg-hanaSilver20 shadow overflow-y-auto scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400 space-y-4">
          {messages.length > 0 &&
            messages.map((msg, index) => (
              <ChatMessage
                key={msg.content}
                subject={msg.accessor === 'guest' ? 'sender' : 'responser'}
                message={msg.content || '내용 없음'}
                lastMessageTime={
                  index === 0 ||
                  msg.createdAt !== messages[index - 1]?.createdAt
                    ? msg.createdAt
                    : null
                }
                responserName="하나은행 상담사"
                responserImage={logo}
              />
            ))}
        </div>

        <div className="flex w-full p-5 bg-gray-300">
          <input
            type="text"
            value={inputValue}
            disabled={true}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 rounded-full text-sm border-2 focus:outline-none bg-gray-100"
            placeholder="메시지를 입력하세요."
          />
          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center p-2 ml-2 rounded-full bg-blue-500 text-white"
          >
            <PiPaperPlaneRightFill className="h-5 w-5" />
          </button>
        </div>
        <GuestChatDetail />
      </div>
    </div>
  );
}
