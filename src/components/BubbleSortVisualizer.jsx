// src/components/BubbleSortVisualizer.jsx
import React, { useEffect, useState, useRef } from 'react';
import { getBubbleSortSteps } from '../algorithms/bubbleSortSteps';
import './BubbleSortVisualizer.css';

function BubbleSortVisualizer({ array }) {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const intervalRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const allSteps = getBubbleSortSteps(array);
    setSteps(allSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  }, [array]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps]);

  useEffect(() => {
    const current = steps[currentStep];
    if (current && current.comparing.length > 0) {
      const idx = current.comparing[0];
      const box = boxRefs.current[idx];
      if (box) {
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const current = steps[currentStep] || { array: [], comparing: [], action: '' };

  const getStepDescription = () => {
    if (!current.action) return 'Ready to start Bubble Sort';
    
    switch (current.action) {
      case 'compare':
        return `Comparing ${current.array[current.comparing[0]]} and ${current.array[current.comparing[1]]} - checking if they need to be swapped`;
      case 'swap':
        return `Swapping ${current.array[current.comparing[0]]} and ${current.array[current.comparing[1]]} - moving larger element to the right`;
      case 'done':
        return 'Bubble Sort completed! Array is now sorted';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="visualizer-container">
      <div className="code-section">
        <pre>{`for i from 0 to n-1:
  for j from 0 to n-i-1:
    if array[j] > array[j+1]:
      swap array[j] and array[j+1]`}</pre>

        <div className="algorithm-info">
          <h3>Bubble Sort Algorithm</h3>
          <p><strong>Time Complexity:</strong></p>
          <ul>
            <li>Best Case: O(n) - when array is already sorted</li>
            <li>Average Case: O(n²) - quadratic time</li>
            <li>Worst Case: O(n²) - when array is reverse sorted</li>
          </ul>
          <p><strong>Space Complexity:</strong> O(1) - in-place sorting</p>
          <p><strong>Stability:</strong> Stable - maintains relative order of equal elements</p>
        </div>

        <div className="buttons">
          <button onClick={handlePrev} disabled={currentStep === 0}>Prev</button>
          <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={handleNext} disabled={currentStep === steps.length - 1}>Next</button>
        </div>

        <div className="step-info">
          Step: {currentStep + 1} / {steps.length}
        </div>

        <div className="explanation">
          {getStepDescription()}
        </div>

        <div className="speed-control">
          <label>Speed: </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={handleSpeedChange}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="array-visual">
        {current.array.map((num, idx) => (
          <div
            className={`array-box ${
              current.comparing.includes(idx)
                ? current.action === 'swap'
                  ? 'swapping'
                  : 'comparing'
                : current.action === 'done'
                  ? 'sorted'
                  : ''
            }`}
            key={idx}
            ref={(el) => (boxRefs.current[idx] = el)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSortVisualizer;
