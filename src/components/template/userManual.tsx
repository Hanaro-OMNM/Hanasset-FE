import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/userManual/atom';

export default function UserManual() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button onClick={() => setIsOpen(false)}>✕</button>
        <h2>메뉴얼 만다는 중 어케하지</h2>
        <button onClick={() => setIsOpen(false)}>닫기</button>
      </div>
    </div>,
    document.body
  );
}
