// import ApartForm from '../form/ApartForm';
// import ApartListForm from '../form/ApartListForm';
// import CarForm from '../form/CarForm';
// import ConfirmLoan from '../form/ConfirmLoan';
// import SalaryForm from '../form/SalaryForm';
import FormLayout from '../../../components/template/FormLayout';
import JobForm from './JobForm';

//라우팅 구현 미완으로 컴포넌트 주석처리 => 라우팅 구현 후 주석 삭제 예정

export default function PropertyForm() {
  return (
    <FormLayout>
      <JobForm />
      {/* <CarForm /> */}
      {/* <ApartForm /> */}
      {/* <ConfirmLoan /> */}
      {/* <ApartListForm /> */}
      {/* <SalaryForm formType="income" /> 소득 입력 폼 */}
      {/* <SalaryForm formType="loan" /> 대출 입력 폼 */}
    </FormLayout>
  );
}
