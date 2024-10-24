import RegisterButton from '../atoms/RegisterPageButton';

interface RegisterButtonGroupProps {
  onRegister: (type: 'home' | 'car') => void;
}

export default function RegisterButtonGroup({
  onRegister,
}: RegisterButtonGroupProps) {
  return (
    <div className="w-full bg-white my-10 h-full rounded-[10px]">
      <RegisterButton
        type="home"
        onClick={onRegister}
        title="부동산"
        description="우리집 등록하고 관리하기"
        roundedTop
      />
      <hr />
      <RegisterButton
        type="car"
        onClick={onRegister}
        title="자동차"
        description="자동차 등록하고 관리하기"
        roundedBottom
      />
    </div>
  );
}
