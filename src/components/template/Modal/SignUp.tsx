import { FaTimes } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import HanaGreeting from '../../../assets/img/signUp/HanaGreeting.png';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import ModalInput from '../../atoms/ModalInput.tsx';

interface SignUpPageProps {
  onSignUpSuccess?: () => void;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function SignUpPage({ onSignUpPage, onClose }: SignUpPageProps) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailVerification: false,
  });

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailVerification: false,
    };

    // 유효성 검사
    if (!userName) {
      newErrors.userName = '닉네임을 입력하세요.';
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '올바른 이메일 주소를 입력하세요.';
      valid = false;
    }
    if (!password || password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
      valid = false;
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      valid = false;
    }

    if (!verificationCode) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validateInputs()) {
      const response = await PlatformAPI.
      onSignUpPage();
    }
  };

  const handleSendEmailVerification = async (email: string) => {
    const response = await PlatformAPI.sendMail(email);
    if (response) {
      setIsVerificationSent(true);
    }
  };

  const handleVerifyCode = async (email: string, verificationCode: string) => {
    const code = Number(verificationCode);
    const response = await PlatformAPI.confirmCode({
      email: email,
      code: code,
    });
    if (response) {
      alert('인증에 성공하셨습니다!');
      setEmailVerification(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <div className="font-bold">회원가입</div>
        <button
          className="absolute top-4 left-2 text-gray-500 hover:text-gray-700"
          onClick={onSignUpPage}
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <button
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <div className="flex justify-center">
        <img src={HanaGreeting} alt="하나은행 로그인" />
      </div>
      <div className="relative space-y-1 px-4 py-1">
        <ModalInput
          name="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
          error={!!errors.userName}
          errorMessage={errors.userName}
        />
        <div className="flex">
          <ModalInput
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <button
            onClick={() => handleSendEmailVerification(email)}
            className="w-20 h-10 px-1 mx-2 mt-1 text-white text-sm bg-hanaGreen60 hover:bg-hanaColor2 rounded-md transition"
          >
            메일인증
          </button>
        </div>
        {isVerificationSent && (
          <div className="flex">
            <ModalInput
              name="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증 코드"
            />
            <button
              onClick={() => handleVerifyCode(email, verificationCode)}
              className="w-20 h-10 px-1 mx-2 mt-1 text-white text-sm bg-hanaGreen60 hover:bg-hanaColor2 rounded-md transition"
            >
              확인
            </button>
          </div>
        )}
        <ModalInput
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          error={!!errors.password}
          errorMessage={errors.password}
        />
        <ModalInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
      </div>

      <div className="flex justify-center flex-col">
        <button
          onClick={handleSignup}
          className="mx-4 py-1 text-white bg-hanaGreen60 hover:bg-hanaColor2 rounded-md transition"
        >
          회원가입
        </button>
        <div className="text-xs text-center py-1 mt-1">
          이미 계정이 있으신가요?{' '}
          <button onClick={onSignUpPage} className="ml-1 my-1 text-hanaColor2">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
