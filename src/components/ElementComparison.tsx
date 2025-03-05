import React from 'react';
import { motion } from 'framer-motion';
import { X, BarChart2 } from 'lucide-react';
import { Element } from '../types/element';

interface ElementComparisonProps {
  elements: Element[];
  onClose: () => void;
  onRemoveElement: (atomicNumber: number) => void;
}

const ElementComparison: React.FC<ElementComparisonProps> = ({ elements, onClose, onRemoveElement }) => {
  // Properties to compare
  const propertiesToCompare = [
    { name: 'Atomic Number', key: 'atomicNumber', unit: '' },
    { name: 'Atomic Mass', key: 'atomicMass', unit: 'u' },
    { name: 'Electronegativity', key: 'electronegativity', unit: '' },
    { name: 'Atomic Radius', key: 'atomicRadius', unit: 'pm' },
    { name: 'Ionization Energy', key: 'ionizationEnergy', unit: 'eV' },
    { name: 'Density', key: 'density', unit: 'g/cm³' },
    { name: 'Melting Point', key: 'meltingPoint', unit: '°C' },
    { name: 'Boiling Point', key: 'boilingPoint', unit: '°C' },
  ];

  // Find the maximum value for each property for scaling the bars
  const maxValues = propertiesToCompare.reduce((acc, { key }) => {
    const propertyKey = key as keyof Element;
    const max = Math.max(...elements.map(el => {
      const value = el[propertyKey];
      return typeof value === 'number' ? value : 0;
    }));
    return { ...acc, [key]: max };
  }, {} as Record<string, number>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart2 className="mr-2 text-blue-600" size={24} />
              <h2 className="text-2xl font-bold">Element Comparison</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Element headers */}
          <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(150px,1fr))] gap-4 mb-6">
            <div className="font-semibold">Property</div>
            {elements.map(element => (
              <div key={element.atomicNumber} className="relative">
                <div className={`p-2 rounded-t-md ${element.category ? `bg-${element.category.replace('bg-', '')}` : 'bg-gray-200'}`}>
                  <div className="font-bold text-center">{element.symbol}</div>
                  <div className="text-sm text-center">{element.name}</div>
                </div>
                <button 
                  onClick={() => onRemoveElement(element.atomicNumber)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Property comparisons */}
          {propertiesToCompare.map(({ name, key, unit }) => {
            const propertyKey = key as keyof Element;
            return (
              <div key={key} className="grid grid-cols-[200px_repeat(auto-fill,minmax(150px,1fr))] gap-4 mb-4 items-center">
                <div className="font-medium">{name}</div>
                {elements.map(element => {
                  const value = element[propertyKey];
                  const displayValue = value !== undefined && value !== null ? value : 'N/A';
                  const percentage = typeof value === 'number' && maxValues[key] 
                    ? (value / maxValues[key]) * 100 
                    : 0;
                  
                  return (
                    <div key={element.atomicNumber} className="flex flex-col">
                      <div className="text-center mb-1">{displayValue}{typeof value === 'number' ? unit : ''}</div>
                      {typeof value === 'number' && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Select elements from the periodic table to add them to this comparison.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ElementComparison;