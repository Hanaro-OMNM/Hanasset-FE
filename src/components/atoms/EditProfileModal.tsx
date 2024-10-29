interface EditProfileModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EditProfileModal({
  message,
  onConfirm,
  onCancel,
}: EditProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <p className="text-lg text-gray-800">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}