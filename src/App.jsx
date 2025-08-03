// src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';
import InsertionSortVisualizer from './components/InsertionSortVisualizer';
import MergeSortVisualizer from './components/MergeSortVisualizer';
import QuickSortVisualizer from './components/QuickSortVisualizer';
import './App.css';

function App() {
  const [originalArray, setOriginalArray] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);

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

  return (
    <div className="app-container">
      <h1>Algovista</h1>
      {showVisualizer ? renderVisualizer() : <Home onVisualize={handleVisualize} />}
    </div>
  );
}

export default App;
