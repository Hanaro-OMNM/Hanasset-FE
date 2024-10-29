interface TextTitleProps {
  children: string;
}

export default function SemiTitle({ children }: TextTitleProps) {
  return (
    <div className="text-base font-semibold text-hanaGreen mb-4 px-2 border-l-4 border-hanaGreen60 mt-10">
      {children}
    </div>
  );
}
