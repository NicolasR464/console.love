"use client"
import React from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface IModalProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ isOpen, userName, onClose }) => {
  const { width, height } = useWindowSize();

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} style={{zIndex: 10}}></div>
      <div className="bg-white p-8 rounded shadow-lg" style={{zIndex: 20}}>
        <Confetti width={width} height={height} numberOfPieces={500} opacity={0.6} colors={["#5271FF", "#FF66C4"]}/>
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg">{userName} just matched with you!</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>Ok</button>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
