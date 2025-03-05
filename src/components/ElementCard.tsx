import React from 'react';
import { Element, categoryColors } from '../types/element';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onClick }) => {
  return (
    <div 
      className={`${categoryColors[element.category]} cursor-pointer p-2 rounded-md shadow-md transition-transform hover:scale-105 hover:z-10 flex flex-col items-center justify-center h-20 w-20`}
      onClick={onClick}
    >
      <div className="text-xs text-gray-800">{element.atomicNumber}</div>
      <div className="text-2xl font-bold text-gray-900">{element.symbol}</div>
      <div className="text-xs text-gray-800 truncate w-full text-center">{element.name}</div>
    </div>
  );
};

export default ElementCard;