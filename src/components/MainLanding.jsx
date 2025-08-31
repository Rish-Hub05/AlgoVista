// src/components/MainLanding.jsx
import React from 'react';
import './MainLanding.css';

const MainLanding = ({ onNavigate }) => {
  const handleSortingClick = () => {
    onNavigate('sorting');
  };

  const handleTreeClick = () => {
    onNavigate('trees');
  };

  return (
    <div className="main-landing">
      <div className="landing-header">
        <h1 className="main-title">AlgoVista</h1>
        <p className="main-subtitle">
          Interactive Algorithm Visualization Platform
        </p>
      </div>

      <div className="landing-content">
        <div 
          className="section-card sorting-section" 
          onClick={handleSortingClick}
        >
          <div className="card-icon-container">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M7 12h10M10 18h4"/>
            </svg>
          </div>
          <h2>Sorting Algorithms</h2>
          <p>
            Explore and visualize various sorting algorithms with step-by-step animations
          </p>
          <div className="features">
            <span>• Bubble Sort Visualization</span>
            <span>• Insertion Sort Animation</span>
            <span>• Merge Sort Step-by-Step</span>
            <span>• Quick Sort Interactive</span>
            <span>• Real-time Comparisons</span>
            <span>• Performance Analysis</span>
          </div>
          <span className="card-arrow">→</span>
        </div>

        <div 
          className="section-card tree-section" 
          onClick={handleTreeClick}
        >
          <div className="card-icon-container">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="6" r="3"/>
              <path d="M12 9v6"/>
              <circle cx="8" cy="18" r="3"/>
              <circle cx="16" cy="18" r="3"/>
              <path d="M8 15l4-3 4 3"/>
            </svg>
          </div>
          <h2>Tree Structures</h2>
          <p>
            Understand tree data structures through interactive visualizations
          </p>
          <div className="features">
            <span>• Binary Tree Traversal</span>
            <span>• Binary Search Tree</span>
            <span>• AVL Tree Balancing</span>
            <span>• Tree Operations</span>
            <span>• Node Insertion/Deletion</span>
            <span>• Path Highlighting</span>
          </div>
          <span className="card-arrow">→</span>
        </div>
      </div>

      <div className="landing-footer">
        <p>
          Choose a category above to start exploring algorithms visually
        </p>
      </div>
    </div>
  );
};

export default MainLanding;
