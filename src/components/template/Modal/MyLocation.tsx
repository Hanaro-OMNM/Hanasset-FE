import { MdClose } from 'react-icons/md';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const MyLocationModal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        {children}
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default MyLocationModal;
