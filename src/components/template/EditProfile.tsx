import { AiFillEdit } from 'react-icons/ai';

interface EditProfileProps {
  imageSrc: string;
  name: string;
  onEdit: () => void;
}

export default function EditProfile({ imageSrc, name, onEdit }: EditProfileProps) {
  return (
    <div className="relative flex flex-col items-center mb-8">
      {/* 프로필 이미지 */}
      <img
        src={imageSrc}
        alt="프로필 이미지"
        className="w-28 h-28 rounded-full object-cover shadow-lg mb-4 border-4 border-hanaGreen60"
      />
      {/* 수정 아이콘 */}
      <button
        onClick={onEdit}
        className="absolute top-20 right-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
      >
        <AiFillEdit className="text-gray-500 text-xl" />
      </button>
      {/* 사용자 이름 */}
      <div className="text-xl font-semibold text-gray-800">{name}</div>
    </div>
  );
}
