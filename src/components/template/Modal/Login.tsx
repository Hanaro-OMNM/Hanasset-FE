import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Greeting from '../../../assets/img/login/HanaGreeting.png';
import { CookieUtils } from '../../../utils/CookieUtils.ts';
import Input from '../../atoms/Input.tsx';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onClose,
  onSignUpPage,
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      return;
    }

    // 임시 쿠키 설정 (예: 1일 동안 유효)
    CookieUtils.setCookie('connect.sid', 'temporary-session-id', 1);

    onLoginSuccess(); // 로그인 성공 후 추가 로직
  };

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <div className="font-bold">로그인</div>
        <button
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <div className="text-center my-4">
        <div>지금 바로 로그인하시고</div>
        <div className="font-bold">관심 매물 상담까지 받아보세요!</div>
      </div>
      <div className="flex justify-center">
        <img src={Greeting} alt="인사" />
      </div>
      <div className="space-y-4 p-4">
        <div className="relative">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디"
            error={error && !email}
            errorMessage=" "
          />
        </div>
        <div className="relative">
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            error={error && !password}
            errorMessage=" "
          />
        </div>
      </div>
      <div className="flex justify-center flex-col">
        <button
          onClick={handleLogin}
          disabled={!email || !password}
          className="mx-4 py-2 text-white bg-hanaGreen60 hover:bg-hanaGreen rounded-md transition"
        >
          로그인
        </button>
        <div className="text-xs text-center py-2">
          아직 MapHana에 가입하지 않으셨나요?
          <button onClick={onSignUpPage} className="ml-1 my-1 text-hanaGreen">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
