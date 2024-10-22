interface Loan {
  fin_inst: string;
  loan_name: string;
  rate: string;
  amount: string;
}

const hanaloan: Loan = {
  fin_inst: '하나은행',
  loan_name: '하나신용대출',
  rate: '8.4',
  amount: '1,300만원',
};

const kbloan: Loan = {
  fin_inst: 'KB국민카드',
  loan_name: 'KB국민이지플러스',
  rate: '14.3%',
  amount: '2,200만원',
};

const loanList: Loan[] = [hanaloan, kbloan];

export default function LoanRecommend() {
  return (
    <div className="w-[375px] h-[676px] relative bg-[#f4f6f9]">
      <div className="w-[375px] h-[62.08px] left-0 top-0 absolute">
        <div className="w-[375px] h-[62.08px] left-0 top-0 absolute bg-neutral-50" />
        {/* header */}
        <div className="left-[58px] top-[19px] absolute text-center text-[#5a5657] text-base font-semibold font-['Poppins'] leading-normal">
          맞춤 상품 안내
        </div>
      </div>

      <div className="left-[208px] top-[76px] absolute text-[#5a5657] text-base font-semibold font-['Inter']">
        내가 가진 자산이에요
      </div>

      <div className="left-[295px] top-[102px] absolute text-[#898989] text-sm font-semibold font-['Inter']">
        100억!
      </div>

      <div className="left-[31px] top-[236px] absolute text-[#5a5657] text-base font-semibold font-['Inter']">
        나에게 맞는 대출 상품을 찾았어요
      </div>

      <div className="w-[326px] h-[148px] left-[24px] top-[457px] absolute">
        <div className="w-[326px] h-[69px] left-0 top-[79px] absolute">
          {/* loan card */}
          {loanList.map((loan: Loan) => (
            <>
              <div className="w-[326px] h-[69px] left-0 top-0 absolute bg-neutral-50 rounded-[10px] shadow" />
              <div className="w-[45.14px] h-[45px] left-[12.04px] top-[12px] absolute bg-[#fff5d9] rounded-xl" />
              <div className="w-[71.22px] h-9 left-[69.21px] top-[17px] absolute">
                <div className="w-[71.22px] left-0 top-0 absolute text-[#5a5657] text-sm font-semibold font-['Inter']">
                  {loan.fin_inst}
                </div>
                <div className="w-[35.11px] left-0 top-[21px] absolute text-black text-xs font-semibold font-['Inter']">
                  {loan.rate}
                </div>
              </div>
              <div className="w-[108.33px] h-9 left-[166.51px] top-[17px] absolute">
                <div className="w-[108.33px] left-0 top-0 absolute text-[#8d8c88] text-xs font-medium font-['Inter']">
                  {loan.loan_name}
                </div>
                <div className="w-[57.18px] left-0 top-[21px] absolute text-black text-xs font-semibold font-['Inter']">
                  {loan.amount}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="w-[155px] h-11 left-[24px] top-[279px] absolute">
        <div className="w-[155px] h-11 left-0 top-0 absolute bg-[#008485] rounded-[15px]" />
        <div className="left-[45.54px] top-[10px] absolute text-center text-neutral-50 text-base font-semibold font-['Poppins'] leading-normal">
          전세 대출
        </div>
      </div>

      <div className="w-[155px] h-11 left-[195px] top-[279px] absolute">
        <div className="w-[155px] h-11 left-0 top-0 absolute bg-[#eeeeec] rounded-[15px]" />
        <div className="left-[45.54px] top-[10px] absolute text-center text-[#5a5657] text-base font-semibold font-['Poppins'] leading-normal">
          신용 대출
        </div>
      </div>

      <div className="w-[326px] h-[69px] left-[24px] top-[376px] absolute" />

      <div className="left-[36px] top-[342px] absolute text-black text-xs font-semibold font-['Inter']">
        금리 낮은 순
      </div>

      <div className="left-[106px] top-[342px] absolute text-[#979797] text-xs font-semibold font-['Inter']">
        한도 높은 순
      </div>

      <div className="w-[69px] h-[44.19px] left-[178px] top-[128px] absolute">
        <img
          className="w-[69px] h-[44.19px] left-0 top-0 absolute"
          src="https://via.placeholder.com/69x44"
        />
        <div className="w-[62px] h-[34px] left-[7px] top-[3px] absolute text-[#faf9f7] text-[11px] font-bold font-['Nunito Sans']">
          자본금 10억 대출금 5억
        </div>
      </div>

      {/* slider */}
      <div className="w-[321px] h-[25px] left-[27px] top-[170px] absolute">
        <div className="w-[353px] h-[7px] p-2 left-[-31px] top-[8px] absolute bg-[#b5b5b5] rounded-[39px]" />
        <div className="left-0 top-[2px] absolute justify-start items-center inline-flex">
          <div className="w-[186px] h-2 bg-[#008485] rounded-[39px]" />
          <div className="w-5 h-5 bg-[#008485] rounded-full" />
        </div>
      </div>
    </div>
  );
}
