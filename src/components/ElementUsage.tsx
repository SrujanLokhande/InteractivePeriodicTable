import React from 'react';
import { Element } from '../types/element';
import { elementUsages } from '../data/elementUsages';

interface ElementUsageProps {
  element: Element;
}

const ElementUsage: React.FC<ElementUsageProps> = ({ element }) => {
  const usage = elementUsages[element.atomicNumber] || { 
    applications: ['No specific applications data available'],
    industries: ['No industry data available'],
    funFacts: ['No fun facts available']
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Applications & Usage</h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Common Applications</h4>
        <ul className="list-disc pl-5 space-y-1">
          {usage.applications.map((application, index) => (
            <li key={index}>{application}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Industries</h4>
        <div className="flex flex-wrap gap-2">
          {usage.industries.map((industry, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {industry}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Fun Facts</h4>
        <ul className="list-disc pl-5 space-y-1">
          {usage.funFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ElementUsage;