import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';

// Title Components
interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h2 className="font-semibold">{title}</h2>;
};

// Content Components
interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return <h2>{content}</h2>;
};

interface LoanDetailDisclosureProps {
  title: string;
  content: string;
}

const LoanDetailDisclosure: React.FC<LoanDetailDisclosureProps> = ({
  title,
  content,
}) => {
  return (
    <div className="m-4 p-6 rounded-lg bg-hanaSilver20 text-hanaSilver">
      <Disclosure>
        <DisclosureButton className={'flex w-full justify-between '}>
          <Title title={title} /> <FaChevronDown className="text-hanaBlack80" />
        </DisclosureButton>
        <DisclosurePanel className={'pt-2'}>
          <Content content={content} />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default LoanDetailDisclosure;
