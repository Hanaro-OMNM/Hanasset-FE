interface LoanFoundMessageProps {
  isFound: boolean;
}

const LoanFoundMessage: React.FC<LoanFoundMessageProps> = ({ isFound }) => {
  return (
    <p className="mt-6 mb-4 text-hanaBlack80 font-semibold">
      {isFound
        ? '나에게 맞는 대출 상품을 찾았어요'
        : '대출 상품을 찾지 못했어요'}
    </p>
  );
};

export default LoanFoundMessage;
