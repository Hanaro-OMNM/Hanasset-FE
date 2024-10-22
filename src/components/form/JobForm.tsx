const joblist: string[] = [
  '직장인',
  '개인사업자',
  '임대사업자',
  '공무원',
  '기타',
  '무직',
];
// 직업 입력 폼
export default function JobForm() {
  return (
    <div className="mt-5">
      <h2 className="w-[246.38px] h-[38.27px] text-[#1f2024] text-xl font-extrabold font-['Inter'] tracking-tight text-left">
        직업을 선택하세요
      </h2>
      {/* 직업 종류 리스트  */}
      <ul className="mt-6 space-y-4">
        {joblist.map((job, index) => (
          <li
            key={index}
            className="w-[205.97px] h-[44.17px] text-[#b5b6b6] text-lg font-extrabold font-['Inter'] tracking-tight text-left flex items-center hover:text-[#5D9588] cursor-pointer"
          >
            <span>{job}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
