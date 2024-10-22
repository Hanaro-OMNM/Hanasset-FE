import { Dialog } from '@headlessui/react';
import close from '../../image/icon/close.png';

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  isOpen,
  closeModal,
  children,
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* 이 부분을 제거하거나 필요에 따라 스타일을 조정 */}
      <div className="modal-content w-full max-w-md bg-white p-5 rounded-lg relative">
        <div className="title flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <span className="text-lg font-bold">{title}</span>
          <img
            src={close}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </Dialog>
  );
}
