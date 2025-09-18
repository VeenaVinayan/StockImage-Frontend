import React, { type ReactNode} from "react";
interface ModalProps {
    isOpen :boolean;
    onClose:() => void;
    children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if(!isOpen) return null;
    return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-xl">
          <button
            className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
