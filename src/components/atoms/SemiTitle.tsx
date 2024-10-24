interface TextTitleProps {
  children: String;
}

export default function SemiTitle({ children }: TextTitleProps) {
  return (
    <div className="text-hanaBlack80 text-base font-semibold font-['Inter']">
      {children}
    </div>
  );
}
