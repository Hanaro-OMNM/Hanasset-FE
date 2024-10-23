// import ApartForm from '../../../components/organisms/form/ApartForm';
// import ApartListForm from '../../../components/organisms/form/ApartListForm';
// import CarForm from '../../../components/organisms/form/CarForm';
// import ConfirmLoan from '../../../components/organisms/form/ConfirmLoan';
import JobForm from '../../../components/organisms/form/JobForm';
// import SalaryForm from '../../../components/organisms/form/SalaryForm';
import FormLayout from '../../../components/template/FormLayout';

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
