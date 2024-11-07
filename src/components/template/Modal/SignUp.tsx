import { FaTimes, FaCamera } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import Input from '../../atoms/Input.tsx';

// import SocialLoginGroup from '../../molecules/SocialLoginGroup.tsx';

interface SignUpPageProps {
  onSignUpSuccess?: () => void;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function SignUpPage({
  onSignUpPage,
  onClose,
  // onSignUpSuccess
}: SignUpPageProps) {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/100'
  );
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file)); // 업로드한 파일 URL을 상태로 설정
    }
  };
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password || password !== confirmPassword) {
      setError(true);
      return;
    }
    navigate('/login');
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
      <div className="relative space-y-4 p-4">
        <Input
          name="userName"
          type="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="닉네임"
          error={error && !userName}
          errorMessage=" "
        />
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디"
          error={error && !email}
          errorMessage=" "
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          error={error && !password}
          errorMessage=" "
        />
        <Input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          error={error && password !== confirmPassword}
          errorMessage=" "
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
