import { useState } from 'react';
import CommonBackground from '../atoms/CommonBackground';
import ConfirmModal from '../atoms/EditProfileModal';
import Input from '../atoms/Input';
import MobileHeader from '../atoms/MobileHeader';

interface EditProfilePageProps {
  onBack: () => void;
}

export default function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);

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
    <>
      <div className="animate-fadeInRight">
        <MobileHeader title="프로필 수정하기" onBack={onBack}></MobileHeader>
        <div className="pr-6">
          <CommonBackground className="p-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mt-5">
                이름
              </label>
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
                inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaColor2"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                현재 비밀번호
              </label>
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
                inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaColor2"
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
                inputClassName="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hanaColor2"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 w-full bg-hanaGreen40 text-white font-medium rounded-lg shadow hover:bg-hanaColor2 transition duration-300"
              >
                저장하기
              </button>

              <button
                onClick={handleCloseChanges}
                className="px-4 py-2 w-full bg-hanaGreen40 text-white font-medium rounded-lg shadow hover:bg-hanaColor2 transition duration-300"
              >
                닫기
              </button>
              <button
                onClick={openModal}
                className="px-4 py-2 w-full bg-hanaRed20 text-white font-medium rounded-lg shadow hover:bg-hanaRed80 transition duration-300"
              >
                회원탈퇴
              </button>
            </div>
          </CommonBackground>
          {showModal && (
            <ConfirmModal
              message="정말로 회원탈퇴 하시겠습니까?"
              onConfirm={handleDeleteAccount}
              onCancel={closeModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
