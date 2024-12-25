import { FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import Greeting from '../../../assets/img/signUp/HanaGreeting.png';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';

interface BirthDateFormProps {
  email: string;
  onClose: () => void;
  onSignUpPage: () => void;
}

export default function BirthDateForm({
  email,
  onClose,
  onSignUpPage,
}: BirthDateFormProps) {
  const [birthDate, setBirthDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
      setErrorMessage('올바른 생년월일 형식(YYYY-MM-DD)을 입력해 주세요.');
      return;
    }

    const today = new Date();
    const selectedDate = new Date(birthDate);
    if (selectedDate > today) {
      setErrorMessage('생년월일은 미래일 수 없습니다.');
      return;
    }
    const response = await PlatformAPI.submitBirthDate({
      email: email,
      birthDate: selectedDate,
    });
    if (response) {
      alert('정상적으로 입력되었습니다.');
      onSignUpPage();
    }
  };

  return (
    <div className="bg-white w-[320px] h-[340px] rounded-lg shadow-lg animate-fadeInRight p-4">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <FaTimes className="text-xl" />
      </button>
      <div className="text-center my-4">
        <div>올바른 대출 상담 비교를 위해</div>
        <div className="font-bold">회원님의 생년월일이 필요합니다!</div>
      </div>
      <div className="flex justify-center my-2">
        <img src={Greeting} alt="하나은행 생년월일 폼 인사" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            생년월일
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={handleBirthDateChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-hanaGreen60 text-white py-2 px-4 rounded-md hover:bg-hanaColor2 transition"
        >
          제출하기
        </button>
      </form>
    </div>
  );
}
