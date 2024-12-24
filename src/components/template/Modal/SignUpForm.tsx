import { useState } from 'react';
import BirthDateForm from './BirthDateForm.tsx';
import SignUpPage from './SignUp.tsx';

interface SignUpPageProps {
  onSignUpSuccess?: () => void;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function SignUpForm({ onSignUpPage, onClose }: SignUpPageProps) {
  const [signUpSuccessEmail, setSignUpSuccessEmail] = useState<
    string | undefined
  >(undefined);

  return (
    <div>
      {signUpSuccessEmail ? (
        <BirthDateForm
          email={signUpSuccessEmail}
          onClose={onClose}
          onSignUpPage={onSignUpPage}
        />
      ) : (
        <SignUpPage
          onSignUpSuccessEmail={setSignUpSuccessEmail}
          onClose={onClose}
          onSignUpPage={onSignUpPage}
        />
      )}
    </div>
  );
}
