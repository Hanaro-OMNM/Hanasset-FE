import SemiTitle from '../../../components/atoms/SemiTitle';

interface LoanFoundMessageProps {
  isFound: boolean;
}

const LoanFoundMessage: React.FC<LoanFoundMessageProps> = ({ isFound }) => {
  return (
    <div>
      <SemiTitle>{isFound ? '' : '대출 상품을 찾지 못했어요'}</SemiTitle>
    </div>
  );
};

export default LoanFoundMessage;
