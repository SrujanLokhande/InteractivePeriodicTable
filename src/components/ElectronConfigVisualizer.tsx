import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Element } from '../types/element';

interface ElectronConfigVisualizerProps {
  element: Element;
}

// Orbital types and their capacities
const orbitals = [
  { name: '1s', capacity: 2, shell: 1, subshell: 's' },
  { name: '2s', capacity: 2, shell: 2, subshell: 's' },
  { name: '2p', capacity: 6, shell: 2, subshell: 'p' },
  { name: '3s', capacity: 2, shell: 3, subshell: 's' },
  { name: '3p', capacity: 6, shell: 3, subshell: 'p' },
  { name: '4s', capacity: 2, shell: 4, subshell: 's' },
  { name: '3d', capacity: 10, shell: 3, subshell: 'd' },
  { name: '4p', capacity: 6, shell: 4, subshell: 'p' },
  { name: '5s', capacity: 2, shell: 5, subshell: 's' },
  { name: '4d', capacity: 10, shell: 4, subshell: 'd' },
  { name: '5p', capacity: 6, shell: 5, subshell: 'p' },
  { name: '6s', capacity: 2, shell: 6, subshell: 's' },
  { name: '4f', capacity: 14, shell: 4, subshell: 'f' },
  { name: '5d', capacity: 10, shell: 5, subshell: 'd' },
  { name: '6p', capacity: 6, shell: 6, subshell: 'p' },
  { name: '7s', capacity: 2, shell: 7, subshell: 's' },
  { name: '5f', capacity: 14, shell: 5, subshell: 'f' },
  { name: '6d', capacity: 10, shell: 6, subshell: 'd' },
  { name: '7p', capacity: 6, shell: 7, subshell: 'p' },
];

// Subshell colors
const subshellColors = {
  's': 'bg-blue-500',
  'p': 'bg-green-500',
  'd': 'bg-yellow-500',
  'f': 'bg-red-500',
};

// Calculate electron distribution in orbitals
const calculateElectronDistribution = (atomicNumber: number) => {
  let remainingElectrons = atomicNumber;
  const distribution: Record<string, number> = {};
  
  for (const orbital of orbitals) {
    if (remainingElectrons <= 0) break;
    
    const electronsInOrbital = Math.min(orbital.capacity, remainingElectrons);
    distribution[orbital.name] = electronsInOrbital;
    remainingElectrons -= electronsInOrbital;
  }
  
  return distribution;
};

const ElectronConfigVisualizer: React.FC<ElectronConfigVisualizerProps> = ({ element }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Calculate electron distribution
  const electronDistribution = calculateElectronDistribution(element.atomicNumber);
  
  // Group orbitals by shell
  const shellGroups = orbitals.reduce((acc, orbital) => {
    if (!acc[orbital.shell]) {
      acc[orbital.shell] = [];
    }
    acc[orbital.shell].push(orbital);
    return acc;
  }, {} as Record<number, typeof orbitals>);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Electron Configuration Visualizer</h3>
        <button
          onClick={() => setShowAnimation(!showAnimation)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {showAnimation ? 'Pause' : 'Animate'}
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-lg font-medium">Electron Configuration: <span className="font-mono">{element.electronConfiguration}</span></p>
      </div>
      
      <div className="space-y-6">
        {Object.entries(shellGroups).map(([shell, shellOrbitals]) => (
          <div key={shell} className="border rounded-lg p-4">
            <h4 className="text-lg font-medium mb-2">Shell {shell}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shellOrbitals.map(orbital => {
                const electronsInOrbital = electronDistribution[orbital.name] || 0;
                return (
                  <div key={orbital.name} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{orbital.name}</span>
                      <span className="text-sm">{electronsInOrbital}/{orbital.capacity} e⁻</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: orbital.capacity }).map((_, i) => {
                        const hasElectron = i < electronsInOrbital;
                        return (
                          <motion.div
                            key={i}
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              hasElectron 
                                ? subshellColors[orbital.subshell as keyof typeof subshellColors] 
                                : 'bg-gray-200'
                            }`}
                            animate={showAnimation && hasElectron ? {
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.8, 1],
                            } : {}}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          >
                            {hasElectron && <span className="text-xs text-white">e⁻</span>}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Subshell Legend</h4>
        <div className="flex flex-wrap gap-4">
          {Object.entries(subshellColors).map(([subshell, color]) => (
            <div key={subshell} className="flex items-center">
              <div className={`w-4 h-4 ${color} rounded-sm mr-1`}></div>
              <span>{subshell}-orbital</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronConfigVisualizer;