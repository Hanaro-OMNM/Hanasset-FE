interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div
        className="w-[340px] h-[570px] bg-white rounded-[10px] filter p-3"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' }}
      >
        {children}
      </div>

      <button className="mt-10 w-[347px] h-12 px-4 py-3 bg-[#abcec8] rounded-xl shadow justify-center items-center gap-2 inline-flex hover:bg-[#008485] hover:outline-none focus:outline-none active:outline-none">
        <div className="text-white text-base font-semibold font-['Inter']">
          다음으로
        </div>
      </button>
    </div>
  );
}
