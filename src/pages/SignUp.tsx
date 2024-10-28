import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/atoms/Input'; 
import SocialLoginGroup  from '../components/molecules/SocialLoginGroup'

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password || password !== confirmPassword) {
      setError(true);
      return;
    }
    console.log('회원가입:', email, password);
    navigate('/login');
  };

  const getLabelClass = (value: string) =>
    value
      ? 'top-[-8px] left-4 text-sm text-hanaGreen60 bg-white px-1' 
      : 'top-1/2 left-4 transform -translate-y-1/2 text-md text-gray-500'; 
      
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-[320px]">
      <div className="w-[300px] max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-black">
          회원가입
        </h2>

        {/* 이메일 입력 */}
        <div className="relative">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            error={error && !email}
            errorMessage=" "
          />
          <label
            className={`absolute transition-all duration-200 ease-in-out ${getLabelClass(
              email
            )}`}
          >
            이메일
          </label>
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative">
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            error={error && !password}
            errorMessage=" "
          />
          <label
            className={`absolute transition-all duration-200 ease-in-out ${getLabelClass(
              password
            )}`}
          >
            비밀번호
          </label>
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=" "
            error={error && password !== confirmPassword}
            errorMessage=" "
          />
          <label
            className={`absolute transition-all duration-200 ease-in-out ${getLabelClass(
              confirmPassword
            )}`}
          >
            비밀번호 확인
          </label>
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignup}
          className="w-full py-2 text-white bg-hanaGreen60 hover:bg-hanaGreen rounded-md transition"
        >
          회원가입
        </button>
        <div className='flex justify-center space-x-8'>
          <SocialLoginGroup />
        </div>
        <p className="text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-hanaGreen hover:underline"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
