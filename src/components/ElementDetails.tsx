import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Info, Atom, History, Beaker } from 'lucide-react';
import { Element, categoryNames, categoryColors } from '../types/element';
import AtomicModel from './AtomicModel';
import ElectronConfigVisualizer from './ElectronConfigVisualizer';
import ElementUsage from './ElementUsage';
import HistoricalTimeline from './HistoricalTimeline';

interface ElementDetailsProps {
  element: Element;
  onClose: () => void;
  onAddToComparison: (element: Element) => void;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onClose, onAddToComparison }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

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
        layoutId={`element-${element.atomicNumber}`}
      >
        {/* Header */}
        <div className={`p-4 ${categoryColors[element.category]} text-white`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-4 text-5xl font-bold">{element.symbol}</div>
              <div>
                <h2 className="text-3xl font-bold">{element.name}</h2>
                <p className="text-white text-opacity-90">Atomic Number: {element.atomicNumber} • Atomic Mass: {element.atomicMass} u</p>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => onAddToComparison(element)}
                className="mr-2 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                title="Add to comparison"
              >
                <Beaker size={20} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            <Info size={18} className="mr-2" />
            Overview
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'atomic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('atomic')}
          >
            <Atom size={18} className="mr-2" />
            Atomic Structure
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'applications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('applications')}
          >
            <Beaker size={18} className="mr-2" />
            Applications
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={18} className="mr-2" />
            History
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-xl font-semibold">{categoryNames[element.category]}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Electron Configuration</p>
                    <p className="text-xl font-semibold font-mono">{element.electronConfiguration}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Physical Properties</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {element.electronegativity && (
                      <div>
                        <p className="text-sm text-gray-500">Electronegativity</p>
                        <p>{element.electronegativity}</p>
                      </div>
                    )}
                    {element.atomicRadius && (
                      <div>
                        <p className="text-sm text-gray-500">Atomic Radius</p>
                        <p>{element.atomicRadius} pm</p>
                      </div>
                    )}
                    {element.ionizationEnergy && (
                      <div>
                        <p className="text-sm text-gray-500">Ionization Energy</p>
                        <p>{element.ionizationEnergy} eV</p>
                      </div>
                    )}
                    {element.density && (
                      <div>
                        <p className="text-sm text-gray-500">Density</p>
                        <p>{element.density} g/cm³</p>
                      </div>
                    )}
                    {element.meltingPoint && (
                      <div>
                        <p className="text-sm text-gray-500">Melting Point</p>
                        <p>{element.meltingPoint} °C</p>
                      </div>
                    )}
                    {element.boilingPoint && (
                      <div>
                        <p className="text-sm text-gray-500">Boiling Point</p>
                        <p>{element.boilingPoint} °C</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Electron Distribution</h3>
                  <div className="flex flex-wrap gap-2">
                    {element.electrons.map((shellElectrons, index) => (
                      <div key={index} className="bg-blue-100 px-3 py-1 rounded-full">
                        Shell {index + 1}: {shellElectrons}e⁻
                      </div>
                    ))}
                  </div>
                </div>
                
                {(element.discoveredBy || element.yearDiscovered) && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Discovery</h3>
                    {element.discoveredBy && <p>Discovered by: {element.discoveredBy}</p>}
                    {element.yearDiscovered && <p>Year: {element.yearDiscovered}</p>}
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ minHeight: '300px' }}>
                  <AtomicModel element={element} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{element.description}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'atomic' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
                  <AtomicModel element={element} />
                </div>
                <ElectronConfigVisualizer element={element} />
              </div>
            </div>
          )}
          
          {activeTab === 'applications' && (
            <div className="p-6">
              <ElementUsage element={element} />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="p-6">
              <HistoricalTimeline element={element} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ElementDetails;