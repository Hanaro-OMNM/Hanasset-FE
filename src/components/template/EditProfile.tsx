import { AiFillEdit } from 'react-icons/ai';

interface EditProfileProps {
  onEdit: () => void;
}

export default function EditProfile({ onEdit }: EditProfileProps) {
  return (
    <div>
      <button
        onClick={onEdit}
        className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
      >
        <AiFillEdit className="text-gray-500 text-xl" />
      </button>
    </div>
  );
}
