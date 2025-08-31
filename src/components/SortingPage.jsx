// src/components/SortingPage.jsx
import React from 'react';
import './SortingPage.css';

const SortingPage = ({ onNavigate, onVisualize }) => {
  const algorithms = [
    {
      id: 'bubble',
      name: 'Bubble Sort',
      description: 'Simple comparison-based algorithm with O(n²) complexity',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg>,
      complexity: 'O(n²)'
    },
    {
      id: 'insertion',
      name: 'Insertion Sort',
      description: 'Builds sorted array one element at a time',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
      complexity: 'O(n²)'
    },
    {
      id: 'merge',
      name: 'Merge Sort',
      description: 'Divide and conquer algorithm with O(n log n) complexity',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0 2-2h3M3 16h3a2 2 0 0 0 2 2v3"/></svg>,
      complexity: 'O(n log n)'
    },
    {
      id: 'quick',
      name: 'Quick Sort',
      description: 'Efficient partition-based sorting algorithm',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
      complexity: 'O(n log n)'
    }
  ];

  const handleAlgorithmSelect = (algorithmId) => {
    // Navigate to input page for selected algorithm
    onNavigate('sorting-input', algorithmId);
  };

  return (
    <div className="sorting-page">
      <div className="page-header">
        <button className="back-button" onClick={() => onNavigate('main')}>
          ← Back to Main
        </button>
        <div className="header-content">
          <h1>Sorting Algorithms</h1>
          <p>Choose an algorithm to visualize and understand its working</p>
        </div>
      </div>

      <div className="algorithms-grid">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            className="algorithm-card"
            onClick={() => handleAlgorithmSelect(algo.id)}
          >
            <div className="card-header">
              <div className="algorithm-icon">{algo.icon}</div>
              <div className="algorithm-info">
                <h3>{algo.name}</h3>
                <span className="complexity">{algo.complexity}</span>
              </div>
            </div>
            <p className="algorithm-description">{algo.description}</p>
            <div className="card-footer">
              <span className="select-text">Click to visualize →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="page-features">
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21 5,3"/>
            </svg>
          </div>
          <span>Interactive Controls</span>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
          </div>
          <span>Performance Analysis</span>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span>Beautiful Animations</span>
        </div>
      </div>
    </div>
  );
};

export default SortingPage;
