import { jwtDecode } from 'jwt-decode';
import { FiX } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import hanaCheerUp from '../../../assets/img/login/hanaCheerUp.gif';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import isLoginAtom from '../../../recoil/isLogin';
import SocialLoginGroup from '../../molecules/SocialLoginGroup.tsx';

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
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginAtom);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    }

    const loginSuccess = await PlatformAPI.login({ email, password });
    if (loginSuccess) {
      alert('로그인 성공하셨습니다.');
      const decodedPayload = jwtDecode(loginSuccess);
      if (decodedPayload.sub) {
        if (!isLogin) {
          setIsLogin(true);
        }
      }
      onClose();
    } else {
      alert('로그인 실패하였습니다.');
      setError(true);
    }
  };

  return (
    <div className="animate-fadeInRight">
      <div className="flex grid-rows-2">
        <div className="max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center my-3">
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <FiX className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex flex-row">
              <div className="text-hanaColor2 text-2xl text-center font-fontBold">
                Hana
              </div>
              <div className="ml-2 text-hanaNavy text-2xl text-center font-fontBold">
                Asset
              </div>
            </div>
            <img
              src={hanaCheerUp}
              className="mt-4 w-32 h-32"
              alt="하나은행 로그인"
            />
          </div>
          <h2 className="text-center text-xl text-gray-700 mb-4">
            <div>지금 바로 로그인하시고</div>
            <div className="font-semibold">관심 매물 상담까지 받아보세요!</div>
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-hanaColor1 focus:outline-none"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-hanaColor1 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleLogin}
              disabled={!email || !password}
              className="w-full py-2 bg-hanaGreen60 text-white rounded-md hover:bg-hanaColor2"
            >
              로그인
            </button>
          </form>
          <div className="text-center mt-4 mb-1">
            <p className="text-sm text-gray-500">
              아직 HanaAsset에 가입하지 않으셨나요?
              <button
                onClick={onSignUpPage}
                className="ml-2 my-1 text-hanaColor2 "
              >
                회원가입
              </button>
            </p>
          </div>
          <div className="flex items-center justify-center mb-1">
            <div className="border-t w-1/3"></div>
            <span className="px-3 text-sm text-gray-500">또는</span>
            <div className="border-t w-1/3"></div>
          </div>
          <SocialLoginGroup onLoginSuccess={onLoginSuccess} />
        </div>
      </div>
    </div>
  );
}
