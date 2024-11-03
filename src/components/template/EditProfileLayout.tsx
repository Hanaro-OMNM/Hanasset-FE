import { IoChevronBack } from 'react-icons/io5';
import React, { useState } from 'react';
import ConfirmModal from '../atoms/EditProfileModal';
import Input from '../atoms/Input';

interface EditProfilePageProps {
  onBack: () => void;
}

export default function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    alert('사용자 정보가 저장되었습니다.');
    onBack();
  };
  const handleCloseChanges = () => {
    onBack();
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDeleteAccount = () => {
    alert('회원탈퇴가 완료되었습니다.');
    setShowModal(false);
    onBack();
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="flex h-12 mb-4 pl-1 gap-2 items-center">
          <button className="items-center" onClick={handleCloseChanges}>
            <IoChevronBack className="text-hanaBlack80 text-xl" />
          </button>
          <h1 className="text-hanaBlack80 text-lg font-semibold ">
            프로필 이미지
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={profileImage || 'https://via.placeholder.com/100'}
            alt="프로필"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">이름</label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이름을 입력하세요"
          required={true}
          error={!username}
          errorMessage=" "
          className="w-full"
          inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaGreen"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">현재 비밀번호</label>
        <Input
          type="password"
          name="currentPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력하세요"
          required={true}
          error={!password}
          errorMessage=" "
          className="w-full"
          inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaGreen"
        />
        <label className="block text-gray-700 font-medium mt-4">
          새 비밀번호
        </label>
        <Input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
          required={true}
          error={!newPassword}
          errorMessage=" "
          className="w-full mt-4"
          inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaGreen"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 w-full bg-hanaGreen60 text-white font-medium rounded-lg shadow hover:bg-hanaGreen transition duration-300"
        >
          저장하기
        </button>
        <button
          onClick={openModal}
          className="px-4 py-2 w-full bg-hanaRed60 text-white font-medium rounded-lg shadow hover:bg-hanaRed80 transition duration-300"
        >
          회원탈퇴
        </button>
        <button
          onClick={handleCloseChanges}
          className="px-4 py-2 w-full bg-hanaGreen60 text-white font-medium rounded-lg shadow hover:bg-hanaGreen transition duration-300"
        >
          닫기
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          message="정말로 회원탈퇴 하시겠습니까?"
          onConfirm={handleDeleteAccount}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
