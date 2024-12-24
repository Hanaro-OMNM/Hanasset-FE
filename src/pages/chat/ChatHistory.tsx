import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import { historyChatroomIdState } from '../../recoil/chathistory/historyChatroomIdState';
import GuestChatDetail from '../GuestChatDetail';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  chatMessageId: number;
  chatroomId: string;
  senderId: number;
  accessor: 'guest' | 'consultant';
  content: string;
  createdAt: string | null;
  messageType: string;
};

const ChatHistory: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const historyChatroomId = useRecoilValue(historyChatroomIdState);

  useEffect(() => {
    if (!historyChatroomId) {
      console.error('No historyChatroomId found!');
      return;
    }
    console.log(
      `Fetching messages for historyChatroomId: ${historyChatroomId}`
    );
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chatroom ID: ${historyChatroomId}`);
        const response =
          await PlatformAPI.getChatroomMessagesByChatroomId(historyChatroomId);

        if (Array.isArray(response)) {
          console.log('Fetched messages:', response);
          setMessages(response);
        } else {
          console.error('Unexpected response format:', response);
          setMessages([]);
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [historyChatroomId]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    console.log('Sending message:', inputValue);
    setInputValue('');
  };

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="flex flex-col h-screen w-full min-w-[420px]">
        <ChatHeader responserName="하나은행 상담사" responserImage={logo} />
        <div className="flex-1 w-full px-4 md:px-8 py-4 bg-hanaSilver20 shadow overflow-y-auto scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400 space-y-4">
          {loading ? (
            <p>Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length > 0 ? (
            messages.map((msg, index) => (
              <ChatMessage
                key={msg.chatMessageId}
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
            ))
          ) : (
            <p>No messages available.</p>
          )}
        </div>

        <div className="flex w-full p-5 bg-gray-300">
          <input
            type="text"
            value={inputValue}
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
};

export default ChatHistory;
