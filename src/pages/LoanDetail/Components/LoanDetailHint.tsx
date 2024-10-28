interface LoanDetailHintProps {
  content: string;
}

const LoanDetailHint: React.FC<LoanDetailHintProps> = ({ content }) => {
  return (
    <div className="ml-4 mr-4 mt-1 mb-2 pl-4 pr-4 text-sm text-hanaBlack60">
      {content}
    </div>
  );
};

export default LoanDetailHint;
