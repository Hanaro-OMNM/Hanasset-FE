import { FaTimes, FaCamera } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';
import ModalInput from '../../atoms/ModalInput.tsx';

interface SignUpPageProps {
  onSignUpSuccess?: () => void;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function SignUpPage({ onSignUpPage, onClose }: SignUpPageProps) {
  const [profileImage, setProfileImage] = useState('https://placehold.co/100');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
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

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validateInputs()) {
      onSignUpPage();
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

      <div className="relative flex flex-col items-center mb-2">
        <img
          src={profileImage}
          alt="프로필"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />

        {/* 연필 아이콘 - input 대신 사용할 버튼 */}
        <label className="absolute top-[65px] right-[105px] bg-white rounded-full p-2 cursor-pointer">
          <FaCamera className="text-gray-500 text-xl" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="relative space-y-2 p-4">
        <ModalInput
          name="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="닉네임"
          error={!!errors.userName}
          errorMessage={errors.userName}
        />
        <ModalInput
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          error={!!errors.email}
          errorMessage={errors.email}
        />
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
          className="mx-4 py-1 text-white bg-hanaGreen60 hover:bg-hanaGreen rounded-md transition"
        >
          회원가입
        </button>
        <div className="text-xs text-center py-1">
          이미 계정이 있으신가요?{' '}
          <button onClick={onSignUpPage} className="ml-1 my-1 text-hanaGreen">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
