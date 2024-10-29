import { PiPaperPlaneRightFill } from 'react-icons/pi';
import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: number;
  sender: 'user' | 'bot';
  message: string;
  time: string; // 각 메시지의 시간을 저장
};

const ChatApp: React.FC = () => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 1,
      sender: 'bot',
      message: '안녕하세요, 상담사 땡땡땡 입니다. 무엇을 도와드릴까요?',
      time: getCurrentTime(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    console.log(lastMessageTime); //오류방지용 임시 console.log 출력

    const currentTime = getCurrentTime();

    const newMessage: ChatMessageType = {
      id: messages.length + 1,
      sender: 'user',
      message: inputValue,
      time: currentTime,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setLastMessageTime(currentTime); // 마지막 메시지 시간을 업데이트

    setTimeout(() => {
      const botReply: ChatMessageType = {
        id: messages.length + 2,
        sender: 'bot',
        message:
          '알겠습니다. 고객님의 매출과 대출 상품 리스트를 확인하였습니다.',
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
      setLastMessageTime(botReply.time); // 마지막 메시지 시간을 업데이트
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center h-full p-4 bg-gray-100">
      {/* ChatHeader 컴포넌트 사용 */}
      <ChatHeader advisorName="하나은행 상담사" advisorImage={logo} />
      <div className="flex-1 w-full max-w-md p-4 bg-hanaSilver20 shadow overflow-y-auto max-h-screen space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            lastMessageTime={
              index === 0 || msg.time !== messages[index - 1].time
                ? msg.time
                : null
            }
            advisorName={msg.sender === 'bot' ? '하나은행 상담사' : undefined} // 상담사 이름 prop 전달
            advisorImage={logo}
          />
        ))}
      </div>

      <div className="flex w-full max-w-md p-5 bg-hanaGreen60 ">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 px-4 rounded-full focus:outline-none text-sm"
          placeholder="메세지를 입력해주세요..."
        />
        <button
          onClick={handleSendMessage}
          className="flex items-center justify-center p-2   ml-2 rounded-full bg-hanaGreen80 text-white hover:bg-hanaGreen transition duration-150 ease-in-out"
        >
          <PiPaperPlaneRightFill className="h-5 w-5 " />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
