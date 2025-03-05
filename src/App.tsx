import React from 'react';
import PeriodicTable from './components/PeriodicTable';
import { Atom } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-8">
      <header className="container mx-auto px-4 mb-8 flex items-center justify-center">
        <Atom size={36} className="text-blue-600 mr-2" />
        <h1 className="text-4xl font-bold text-gray-800">Periodic Table Explorer</h1>
      </header>
      
      <main className="container mx-auto px-4">
        <PeriodicTable />
      </main>
      
      <footer className="container mx-auto px-4 py-8 mt-12 text-center text-gray-600">
        <p>Interactive Periodic Table - Explore elements and their atomic structures</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Periodic Table Explorer</p>
      </footer>
    </div>
  );
}

export default App;