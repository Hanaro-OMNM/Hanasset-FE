import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';
import SockJS from 'sockjs-client';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/logo.png';
import profile from '../../assets/img/profile_ex.jpg';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import chatroomIdState from '../../recoil/chatroomId/atom.ts';
import GuestChatDetail from '../GuestChatDetail';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: number;
  user: 'guest' | 'consultant';
  subject: 'sender' | 'responser';
  message: string;
  time: string;
};

interface ChatAppProps {
  accessor: 'guest' | 'consultant';
}

const ChatApp: React.FC<ChatAppProps> = ({ accessor }) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [subscription, setSubscription] = useState<StompSubscription | null>(
    null
  );

  const [currentState, setCurrentState] = useState<string>('waiting');
  const chatroomId = useRecoilValue(chatroomIdState);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const initialMessages: ChatMessageType[] = [
    {
      id: 1,
      user: 'consultant',
      subject: 'responser',
      message: '안녕하세요. 무엇을 도와드릴까요?',
      time: getCurrentTime(),
    },
  ];

  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-chat'); // 백엔드 서버 URL
    const token = window.localStorage.getItem('accessToken');
    console.log(token);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    client.onConnect = () => {
      console.log(`[${accessor}] Connected to WebSocket`);

      // Redis에서 채팅 기록 요청
      client.publish({
        destination: `/app/chat.history/${chatroomId}`,
        headers: {
          Authorization: token
            ? `Bearer ${window.localStorage.getItem('accessToken')}`
            : '',
        },
      });

      // Redis에서 메시지 기록 및 실시간 메시지 처리
      const sub = client.subscribe(
        `/topic/rooms/${chatroomId}`,
        (message: Message) => {
          const newData = JSON.parse(message.body);

          if (Array.isArray(newData)) {
            // Redis에서 가져온 기록 메시지
            const loadedMessages = newData.slice(1).map((msg, index) => ({
              id: index + 1,
              user: msg.accessor === 'consultant' ? 'consultant' : 'guest',
              subject: msg.accessor === 'consultant' ? 'responser' : 'sender',
              message: msg.content,
              time: msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString()
                : getCurrentTime(),
            }));

            // 기존 메시지 초기화 후 새로운 기록 추가
            setMessages([...initialMessages, ...loadedMessages]);
          } else {
            // 실시간 메시지 처리
            const newMessage: ChatMessageType = {
              id: messages.length + 1,
              user: newData.accessor === 'consultant' ? 'consultant' : 'guest',
              subject:
                newData.accessor === 'consultant' ? 'responser' : 'sender',
              message: newData.content,
              time: getCurrentTime(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      );

      setSubscription(sub);
    };

    client.activate();
    setStompClient(client);

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (subscription) subscription.unsubscribe();
      client.deactivate();
    };
  }, [chatroomId, accessor]);

  const updateChatroomStatus = async () => {
    if (isUpdatingStatus) return;
    if (!chatroomId) {
      console.error('chatroomId is not set.');
      return;
    }

    setIsUpdatingStatus(true);
    try {
      console.log(`Updating chatroom status for chatroomId: ${chatroomId}`);
      const nextState = currentState === 'waiting' ? 'active' : 'completed';

      const response = await PlatformAPI.updateChatroomStatus(
        chatroomId,
        currentState
      );
      console.log('Chatroom status updated successfully:', response);

      setCurrentState(nextState);
    } catch (error) {
      console.error('Error updating chatroom status:', error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendMessage = () => {
    const token = window.localStorage.getItem('accessToken');
    if (stompClient && inputMessage.trim() !== '') {
      const message = {
        messageType: 'TALK',
        chatroomId: chatroomId,
        senderId: 1,
        accessor: accessor,
        content: inputMessage,
        createdAt: new Date().toISOString(),
      };
      stompClient.publish({
        destination: `/app/chat.sendMessage/${chatroomId}`,
        body: JSON.stringify(message),
        headers: {
          Authorization: token
            ? `Bearer ${window.localStorage.getItem('accessToken')}`
            : '',
        },
      });
      setInputMessage('');
    }
  };

  useEffect(() => {
    if (chatroomId && currentState === 'waiting') {
      updateChatroomStatus();
    }
  }, [chatroomId, currentState]);
  return (
    <div>
      <div>
        {accessor === 'guest' ? (
          <div className="top-0 absolute pl-4 animate-fadeInRight">
            <div className="flex flex-col h-screen w-full items-center min-w-[420px]">
              <ChatHeader
                responserName="하나은행 상담사"
                responserImage={logo}
              />
              <div className="flex-1 w-full px-4 md:px-8 py-4 bg-hanaSilver20 shadow overflow-y-auto scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400 space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    subject={msg.subject}
                    message={msg.message}
                    lastMessageTime={
                      index === 0 || msg.time !== messages[index - 1].time
                        ? msg.time
                        : null
                    }
                    responserName="하나은행 상담사"
                    responserImage={logo}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex w-full p-5 bg-hanaGreen60">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 rounded-full text-sm border-2 focus:border-hanaGreen80 focus:outline-none"
                  placeholder="메세지를 입력해주세요..."
                />
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center p-2 ml-2 rounded-full bg-hanaGreen80 text-white hover:bg-hanaGreen transition duration-150 ease-in-out"
                >
                  <PiPaperPlaneRightFill className="h-5 w-5" />
                </button>
              </div>
            </div>
            <GuestChatDetail />
          </div>
        ) : (
          <div className="flex flex-col h-screen w-full items-center">
            <ChatHeader responserName={'고객1'} responserImage={profile} />
            <div className="flex-1 w-full px-4 md:px-8 py-4 bg-hanaSilver20 shadow overflow-y-auto scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400 space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id}
                  subject={msg.subject}
                  message={msg.message}
                  lastMessageTime={
                    index === 0 || msg.time !== messages[index - 1].time
                      ? msg.time
                      : null
                  }
                  responserName="고객1"
                  responserImage={profile}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex w-full p-5 bg-hanaGreen60">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 rounded-full text-sm border-2 focus:border-hanaGreen80 focus:outline-none"
                placeholder="메세지를 입력해주세요..."
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center p-2 ml-2 rounded-full bg-hanaGreen80 text-white hover:bg-hanaGreen transition duration-150 ease-in-out"
              >
                <PiPaperPlaneRightFill className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
