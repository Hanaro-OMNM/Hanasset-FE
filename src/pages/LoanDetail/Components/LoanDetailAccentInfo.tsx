// Title Components
interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h2 className="h-6 text-hanaBlack60 font-semibold">{title}</h2>;
};

// Content Components
interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <h2 className="h-10 text-hanaGreen text-2xl font-semibold">{content}</h2>
  );
};

interface LoanDetailAccentInfoProps {
  title: string;
  content: string;
}

const LoanDetailAccentInfo: React.FC<LoanDetailAccentInfoProps> = ({
  title,
  content,
}) => {
  return (
    <div className="mt-4 ml-4 mr-4 pt-4 pl-4 pr-4">
      <Title title={title} />
      <Content content={content} />
    </div>
  );
};

export default LoanDetailAccentInfo;
