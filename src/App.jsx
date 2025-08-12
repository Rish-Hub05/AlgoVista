// src/App.jsx
import React, { useState } from 'react';
import MainLanding from './components/MainLanding';
import Home from './components/Home';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'sorting', 'trees'
  const [originalArray, setOriginalArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'sorting') {
      setShowVisualizer(false);
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
        return (
          <div className="app-container">
            <div className="sorting-header">
              <button className="back-button" onClick={() => handleNavigate('main')}>
                ← Back to Main
              </button>
              <h1>Sorting Algorithms</h1>
            </div>
            {showVisualizer ? renderVisualizer() : <Home onVisualize={handleVisualize} />}
          </div>
        );
      case 'trees':
        return <TreeVisualizer onBack={() => handleNavigate('main')} />;
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
