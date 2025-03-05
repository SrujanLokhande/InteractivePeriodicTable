import React from 'react';
import { Element } from '../types/element';

interface HistoricalTimelineProps {
  element: Element;
}

// Time periods for context
const timePeriods = [
  { name: 'Ancient Times', start: -8000, end: 476, color: 'bg-amber-100' },
  { name: 'Middle Ages', start: 476, end: 1492, color: 'bg-emerald-100' },
  { name: 'Renaissance', start: 1492, end: 1800, color: 'bg-blue-100' },
  { name: 'Industrial Revolution', start: 1800, end: 1900, color: 'bg-purple-100' },
  { name: 'Modern Era', start: 1900, end: 2025, color: 'bg-red-100' },
];

// Key events in chemistry history
const chemistryMilestones = [
  { year: -3000, event: 'Early metallurgy begins (copper, gold)' },
  { year: -1200, event: 'Iron Age begins' },
  { year: 1669, event: 'Hennig Brand discovers phosphorus' },
  { year: 1789, event: 'Antoine Lavoisier publishes first list of elements' },
  { year: 1803, event: 'John Dalton proposes atomic theory' },
  { year: 1869, event: 'Dmitri Mendeleev publishes first periodic table' },
  { year: 1911, event: 'Ernest Rutherford discovers atomic nucleus' },
  { year: 1913, event: 'Niels Bohr proposes model of the atom' },
  { year: 1932, event: 'James Chadwick discovers the neutron' },
  { year: 1945, event: 'Glenn Seaborg begins synthesizing transuranium elements' },
  { year: 2016, event: 'IUPAC confirms elements 113, 115, 117, and 118' },
];

const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ element }) => {
  if (!element.yearDiscovered) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Historical Timeline</h3>
        <p>No specific discovery date is recorded for {element.name}. Many elements like {element.name} have been known since ancient times or their discovery process was gradual.</p>
      </div>
    );
  }
  
  // Find which time period the element was discovered in
  const discoveryPeriod = timePeriods.find(
    period => element.yearDiscovered! >= period.start && element.yearDiscovered! <= period.end
  );
  
  // Find nearby chemistry milestones (within 50 years)
  const nearbyMilestones = chemistryMilestones.filter(
    milestone => Math.abs(milestone.year - element.yearDiscovered!) <= 50
  ).sort((a, b) => a.year - b.year);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Historical Timeline</h3>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className={`w-4 h-4 rounded-full ${discoveryPeriod?.color || 'bg-gray-200'} mr-2`}></div>
          <h4 className="text-lg font-medium">
            Discovered in {element.yearDiscovered} 
            {discoveryPeriod && ` (${discoveryPeriod.name})`}
          </h4>
        </div>
        
        {element.discoveredBy && (
          <p className="mb-4">Discovered by: {element.discoveredBy}</p>
        )}
      </div>
      
      {/* Visual timeline */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-4 w-full h-1 bg-gray-200"></div>
        <div className="relative flex justify-between">
          {timePeriods.map((period, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${period.color.replace('bg-', 'bg-')} border border-gray-400 z-10`}></div>
              <div className="text-xs mt-2 transform -rotate-45 origin-top-left">
                {period.start < 0 ? `${Math.abs(period.start)} BCE` : period.start}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400 z-10"></div>
            <div className="text-xs mt-2 transform -rotate-45 origin-top-left">
              2025
            </div>
          </div>
        </div>
        
        {/* Element discovery marker */}
        <div 
          className="absolute top-2.5 w-4 h-4 rounded-full bg-red-500 border-2 border-white z-20"
          style={{ 
            left: `${((element.yearDiscovered! - timePeriods[0].start) / (2025 - timePeriods[0].start)) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
            <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              {element.symbol} ({element.yearDiscovered})
            </div>
          </div>
        </div>
      </div>
      
      {/* Historical context */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Historical Context</h4>
        <p className="text-gray-700">
          {element.name} was discovered during a period of {discoveryPeriod?.name || 'history'} 
          when many scientific advancements were taking place. 
          {element.discoveredBy 
            ? ` ${element.discoveredBy}'s discovery contributed to our understanding of atomic structure and properties.` 
            : ''}
        </p>
      </div>
      
      {/* Nearby chemistry milestones */}
      {nearbyMilestones.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-2">Notable Events Around This Time</h4>
          <ul className="space-y-2">
            {nearbyMilestones.map((milestone, index) => (
              <li key={index} className="flex items-start">
                <span className="font-medium mr-2">{milestone.year}:</span>
                <span>{milestone.event}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoricalTimeline;