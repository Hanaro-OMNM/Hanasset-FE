import { AiFillEdit } from 'react-icons/ai';

interface EditProfileProps {
  name: string;
  onEdit: () => void;
}

export default function EditProfile({ name, onEdit }: EditProfileProps) {
  return (
    <div>
      {/* 수정 아이콘 */}
      <button
        onClick={onEdit}
        className="absolute top-20 right-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
      >
        <AiFillEdit className="text-gray-500 text-xl" />
      </button>
      {/* 사용자 이름 */}
      <div className="font-fontBold text-2xl">
        {name}
        <span className="font-fontMedium text-2xl">님</span>
      </div>
    </div>
  );
}
