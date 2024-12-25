import { useState } from 'react';
import LoginPage from './Login.tsx';
import SignUpForm from './SignUpForm.tsx';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export default function Modal({ onLoginSuccess, onClose }: LoginPageProps) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <div>
      {isLoginPage ? (
        <LoginPage
          onLoginSuccess={onLoginSuccess}
          onClose={onClose}
          onSignUpPage={() => setIsLoginPage(false)}
        />
      ) : (
        <SignUpForm
          onSignUpSuccess={() => setIsLoginPage(true)}
          onClose={onClose}
          onSignUpPage={() => setIsLoginPage(true)}
        />
      )}
    </div>
  );
}
