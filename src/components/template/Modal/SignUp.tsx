import { FaTimes } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import ModalInput from '../../atoms/ModalInput.tsx';

interface SignUpPageProps {
  onSignUpSuccessEmail: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function SignUpPage({
  onSignUpSuccessEmail,
  onSignUpPage,
  onClose,
}: SignUpPageProps) {
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

    if (!emailVerification) {
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      const statusCode = await PlatformAPI.signUp({
        email: email,
        name: userName,
        password: password,
        confirmPassword: confirmPassword,
      });
      if (statusCode === 200) {
        alert('회원가입에 성공하셨습니다.');
        onSignUpSuccessEmail(email!);
      } else {
        if (statusCode === 401 || statusCode === 400) {
          alert('이미 등록된 이메일입니다.');
        }
      }
    }
  };

  const handleSendEmailVerification = async (email: string) => {
    const response = await PlatformAPI.sendMail(email);
    if (response) {
      alert('메일이 전송되었습니다.');
      setIsVerificationSent(true);
    } else {
      alert('메일 전송에 실패했습니다!');
    }
  };

  const handleVerifyCode = async (email: string, verificationCode: string) => {
    const code = Number(verificationCode);
    const response = await PlatformAPI.confirmCode({
      email: email,
      code: code,
    });
    if (response) {
      alert('인증에 성공하셨습니다.');
      setEmailVerification(true);
    } else {
      alert('메일 인증에 실패했습니다!');
    }
  };

  return (
    <div className="bg-white w-[320px] h-[500px] rounded-lg shadow-lg animate-fadeInRight">
      <div className="flex items-center justify-center my-4">
        <div className="font-bold mt-4">회원가입</div>
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
      <div className="relative px-4 py-1">
        <ModalInput
          name="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
          className="pb-4"
          error={!!errors.userName}
          errorMessage={errors.userName}
        />
        <div className="space-y-2">
          <div>
            <div className="flex">
              <input
                className="flex-grow rounded-xl p-2 focus:outline-none text-left border-2 bg-white text-hanaBlack80 !border-opacity-50 !border-hanaGreen40"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
              />
              <button
                onClick={() => handleSendEmailVerification(email)}
                className="w-20 h-10 px-1 mx-2 mt-1 text-white text-sm bg-hanaGreen60 hover:bg-hanaColor2 rounded-md transition"
              >
                인증
              </button>
            </div>
            {isVerificationSent && !emailVerification && (
              <p className="text-xs text-gray-500 ml-2 my-1">
                인증 메일이 전송되었습니다. 메일을 확인해 주세요.
              </p>
            )}
            {emailVerification && (
              <p className="text-xs text-green-600 ml-2 my-1">
                이메일 인증이 성공적으로 완료되었습니다.
              </p>
            )}
            {!isVerificationSent && !emailVerification && (
              <p className="text-xs text-red-500 ml-2 my-1">
                확인 코드를 전송해주세요.
              </p>
            )}
          </div>
          <div>
            <div className="flex">
              <input
                className="flex-grow rounded-xl p-2 focus:outline-none text-left border-2 bg-white text-hanaBlack80 !border-opacity-50 !border-hanaGreen40"
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
            {emailVerification ? (
              <p className="text-xs text-green-600 ml-2 my-1">
                인증 코드가 확인되었습니다.
              </p>
            ) : (
              <p className="text-xs text-red-500 ml-2 my-1">
                인증 코드를 확인해주세요.
              </p>
            )}
          </div>
        </div>
        <ModalInput
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="pb-4"
          error={!!errors.password}
          errorMessage={errors.password}
        />
        <ModalInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          className="pb-4"
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
      </div>
      <div className="flex justify-center flex-col">
        <button
          onClick={() => handleSignUp()}
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
