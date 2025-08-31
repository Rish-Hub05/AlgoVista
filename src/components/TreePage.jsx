// src/components/TreePage.jsx
import React from 'react';
import './TreePage.css';

const TreePage = ({ onNavigate }) => {
  const treeTypes = [
    {
      id: 'binary-tree',
      name: 'Binary Tree',
      description: 'Basic tree structure with at most two children per node',
      icon: '🌲',
      operations: ['Insert', 'Search', 'Delete', 'Traversal']
    },
    {
      id: 'bst',
      name: 'Binary Search Tree',
      description: 'Ordered binary tree for efficient searching',
      icon: '🔍',
      operations: ['Insert', 'Search', 'Delete', 'Min/Max']
    },
    {
      id: 'avl-tree',
      name: 'AVL Tree',
      description: 'Self-balancing binary search tree',
      icon: '⚖️',
      operations: ['Insert', 'Delete', 'Balance', 'Rotate']
    },
    {
      id: 'heap',
      name: 'Heap Tree',
      description: 'Complete binary tree with heap property',
      icon: '📚',
      operations: ['Insert', 'Extract', 'Heapify', 'Build']
    }
  ];

  const handleTreeSelect = (treeId) => {
    // Navigate to tree visualizer for selected tree type
    onNavigate('tree-visualizer', treeId);
  };

  return (
    <div className="tree-page">
      <div className="page-header">
        <button className="back-button" onClick={() => onNavigate('main')}>
          ← Back to Main
        </button>
        <div className="header-content">
          <h1>🌳 Tree Structures</h1>
          <p>Explore and visualize different tree data structures</p>
        </div>
      </div>

      <div className="trees-grid">
        {treeTypes.map((tree) => (
          <div
            key={tree.id}
            className="tree-card"
            onClick={() => handleTreeSelect(tree.id)}
          >
            <div className="card-header">
              <span className="tree-icon">{tree.icon}</span>
              <h3>{tree.name}</h3>
            </div>
            <p className="tree-description">{tree.description}</p>
            <div className="operations">
              <h4>Operations:</h4>
              <div className="operation-tags">
                {tree.operations.map((op, index) => (
                  <span key={index} className="operation-tag">{op}</span>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <span className="select-text">Click to explore →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="page-features">
        <div className="feature">
          <span className="feature-icon">🎯</span>
          <span>Interactive Operations</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🔄</span>
          <span>Step-by-step Visualization</span>
        </div>
        <div className="feature">
          <span className="feature-icon">📈</span>
          <span>Complexity Analysis</span>
        </div>
      </div>
    </div>
  );
};

export default TreePage;
