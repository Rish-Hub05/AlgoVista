// src/components/Home.jsx
import React, { useState, useEffect } from 'react';

function Home({ onVisualize, algorithm: preselectedAlgorithm }) {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState(preselectedAlgorithm || 'bubble');

  useEffect(() => {
    if (preselectedAlgorithm) {
      setAlgorithm(preselectedAlgorithm);
    }
  }, [preselectedAlgorithm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = input
      .split(',')
      .map((item) => parseInt(item.trim()))
      .filter((n) => !isNaN(n));

    onVisualize(arr, algorithm);
  };

  return (
    <form className="home-form" onSubmit={handleSubmit}>
      <label>Enter array (comma separated):</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g., 5,2,9,1"
      />

      <label>Select Algorithm:</label>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>

      <button type="submit">Visualize</button>
    </form>
  );
}

export default Home;
