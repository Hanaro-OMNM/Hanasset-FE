// components/atoms/SocialLoginGroup.tsx
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialLoginGroup: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log('구글 로그인');
    // 구글 로그인 로직 추가
  };

  const handleFacebookLogin = () => {
    console.log('페이스북 로그인');
    // 페이스북 로그인 로직 추가
  };

  const handleInstagramLogin = () => {
    console.log('인스타그램 로그인');
    // 인스타그램 로그인 로직 추가
  };

  return (
    <div className="flex justify-center space-x-8">
      <FcGoogle onClick={handleGoogleLogin} className="w-6 h-6 cursor-pointer" />
      <FaFacebook onClick={handleFacebookLogin} className="w-6 h-6 cursor-pointer" />
      <FaInstagram onClick={handleInstagramLogin} className="w-6 h-6 cursor-pointer" />
    </div>
  );
};

export default SocialLoginGroup;
