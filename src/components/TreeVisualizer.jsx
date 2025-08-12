// src/components/TreeVisualizer.jsx
import React from 'react';
import './TreeVisualizer.css';

function TreeVisualizer({ onBack }) {
  return (
    <div className="tree-visualizer">
      <div className="tree-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Main
        </button>
        <h1>Tree Data Structures</h1>
        <p>Coming Soon - Tree visualization features will be implemented here</p>
      </div>

      <div className="tree-content">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">🌳</div>
          <h2>Tree Visualizations</h2>
          <p>This section will include interactive visualizations for:</p>
          <div className="tree-features">
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span>Binary Search Trees</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚖️</span>
              <span>AVL Trees</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔴</span>
              <span>Red-Black Trees</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span>Tree Traversals</span>
            </div>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '25%' }}></div>
            </div>
            <span>Development in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreeVisualizer; 