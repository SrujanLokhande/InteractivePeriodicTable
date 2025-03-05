import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Search, Filter } from 'lucide-react';
import ElementCard from './ElementCard';
import ElementDetails from './ElementDetails';
import ElementComparison from './ElementComparison';
import { elements, periodicTableLayout, elementMap } from '../data/periodicTableData';
import { Element, ElementCategory, categoryColors, categoryNames } from '../types/element';

const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [comparisonElements, setComparisonElements] = useState<Element[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const handleCloseDetails = () => {
    setSelectedElement(null);
  };

  const handleAddToComparison = (element: Element) => {
    if (!comparisonElements.some(e => e.atomicNumber === element.atomicNumber)) {
      setComparisonElements([...comparisonElements, element]);
    }
    setSelectedElement(null);
  };

  const handleRemoveFromComparison = (atomicNumber: number) => {
    setComparisonElements(comparisonElements.filter(e => e.atomicNumber !== atomicNumber));
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
  };

  const filteredElements = elements.filter(element => {
    const matchesSearch = searchTerm === '' || 
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.atomicNumber.toString().includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || element.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const highlightedElements = searchTerm || selectedCategory !== 'all' 
    ? new Set(filteredElements.map(e => e.atomicNumber)) 
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Interactive Periodic Table</h1>
        <p className="text-center text-gray-600 mb-6">Click on any element to explore its properties and 3D atomic structure</p>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by element name, symbol, or atomic number"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ElementCategory | 'all')}
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryNames).map(([category, name]) => (
                <option key={category} value={category}>{name}</option>
              ))}
            </select>
          </div>
          
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              comparisonElements.length > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => comparisonElements.length > 0 && setShowComparison(true)}
            disabled={comparisonElements.length === 0}
          >
            <BarChart2 size={18} className="mr-2" />
            Compare Elements ({comparisonElements.length})
          </button>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className="flex items-center cursor-pointer"
              onClick={() => setSelectedCategory(
                selectedCategory === category as ElementCategory ? 'all' : category as ElementCategory
              )}
            >
              <div className={`w-4 h-4 ${categoryColors[category as ElementCategory]} rounded-sm mr-1 ${
                selectedCategory === category ? 'ring-2 ring-blue-500' : ''
              }`}></div>
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {periodicTableLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((atomicNumber, colIndex) => {
                if (atomicNumber === 0) {
                  return <div key={`empty-${rowIndex}-${colIndex}`} className="h-20 w-20 m-1"></div>;
                }
                
                const element = elementMap[atomicNumber];
                if (!element) return null;
                
                const isHighlighted = !highlightedElements || highlightedElements.has(element.atomicNumber);
                const isInComparison = comparisonElements.some(e => e.atomicNumber === element.atomicNumber);
                
                return (
                  <motion.div 
                    key={element.atomicNumber}
                    className="m-1"
                    layoutId={`element-${element.atomicNumber}`}
                    style={{
                      opacity: isHighlighted ? 1 : 0.3,
                      scale: isInComparison ? 1.05 : 1,
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                  >
                    <ElementCard 
                      element={element} 
                      onClick={() => handleElementClick(element)} 
                    />
                    {isInComparison && (
                      <div className="relative">
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {comparisonElements.findIndex(e => e.atomicNumber === element.atomicNumber) + 1}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedElement && (
          <ElementDetails 
            element={selectedElement} 
            onClose={handleCloseDetails}
            onAddToComparison={handleAddToComparison}
          />
        )}
        
        {showComparison && comparisonElements.length > 0 && (
          <ElementComparison
            elements={comparisonElements}
            onClose={handleCloseComparison}
            onRemoveElement={handleRemoveFromComparison}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeriodicTable;