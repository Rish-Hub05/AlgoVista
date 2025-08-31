// src/App.jsx
import React, { useState } from 'react';
import MainLanding from './components/MainLanding';
import SortingPage from './components/SortingPage';
import TreePage from './components/TreePage';
import Home from './components/Home';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import QuickSortVisualizer from './components/QuickSortVisualizer';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [selectedTreeType, setSelectedTreeType] = useState('');
  const [originalArray, setOriginalArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    
    // Reset visualizer state when navigating to main pages
    if (page === 'main' || page === 'sorting' || page === 'trees') {
      setShowVisualizer(false);
      setSelectedAlgorithm('');
      setSelectedTreeType('');
    }
    
    // Handle algorithm selection from SortingPage
    if (page === 'sorting-input' && data) {
      setSelectedAlgorithm(data);
    }
    
    // Handle tree type selection from TreePage
    if (page === 'tree-visualizer' && data) {
      setSelectedTreeType(data);
    }
  };

  const handleVisualize = (data, algo) => {
    setOriginalArray([...data]);
    setCurrentArray([...data]);
    setAlgorithm(algo);
    setShowVisualizer(true);
  };

  const handleReset = () => {
    setCurrentArray([...originalArray]);
  };

  const handleShuffle = () => {
    const shuffled = [...originalArray].sort(() => Math.random() - 0.5);
    setCurrentArray(shuffled);
  };

  const handleReplay = () => {
    setCurrentArray([...originalArray]);
  };

  const renderVisualizer = () => {
    switch (algorithm) {
      case 'bubble':
        return (
          <BubbleSortVisualizer
            array={currentArray}
            onReset={handleReset}
            onShuffle={handleShuffle}
            onReplay={handleReplay}
          />
        );
      case 'insertion':
        return (
          <InsertionSortVisualizer
            array={currentArray}
            onReset={handleReset}
            onShuffle={handleShuffle}
            onReplay={handleReplay}
          />
        );
      case 'merge':
        return (
          <MergeSortVisualizer
            array={currentArray}
            onReset={handleReset}
            onShuffle={handleShuffle}
            onReplay={handleReplay}
          />
        );
      case 'quick':
        return (
          <QuickSortVisualizer
            array={currentArray}
            onReset={handleReset}
            onShuffle={handleShuffle}
            onReplay={handleReplay}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'main':
        return <MainLanding onNavigate={handleNavigate} />;
      
      case 'sorting':
        return <SortingPage onNavigate={handleNavigate} onVisualize={handleVisualize} />;
      
      case 'sorting-input':
        return (
          <div className="app-container">
            <div className="sorting-header">
              <button className="back-button" onClick={() => handleNavigate('sorting')}>
                ← Back to Sorting
              </button>
              <h1>{selectedAlgorithm ? selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1) + ' Sort' : 'Sorting'} Visualization</h1>
            </div>
            {showVisualizer ? renderVisualizer() : <Home onVisualize={handleVisualize} algorithm={selectedAlgorithm} />}
          </div>
        );
      
      case 'trees':
        return <TreePage onNavigate={handleNavigate} />;
      
      case 'tree-visualizer':
        return (
          <div className="app-container">
            <div className="tree-header">
              <button className="back-button" onClick={() => handleNavigate('trees')}>
                ← Back to Trees
              </button>
              <h1>{selectedTreeType ? selectedTreeType.charAt(0).toUpperCase() + selectedTreeType.slice(1).replace('-', ' ') : 'Tree'} Visualization</h1>
            </div>
            <div className="coming-soon">
              <h2>🚧 Coming Soon</h2>
              <p>Tree visualization for {selectedTreeType} will be implemented here.</p>
            </div>
          </div>
        );
      
      default:
        return <MainLanding onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;
