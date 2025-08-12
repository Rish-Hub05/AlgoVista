// src/components/QuickSortVisualizer.jsx
import React, { useEffect, useState, useRef } from 'react';
import { getQuickSortSteps } from '../algorithms/quickSortSteps';
import './QuickSortVisualizer.css';

function QuickSortVisualizer({ array }) {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const intervalRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const allSteps = getQuickSortSteps(array);
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
    if (current && current.comparing && current.comparing.length > 0) {
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

  const current = steps[currentStep] || { array: [], comparing: [], action: '', description: '' };

  const getStepDescription = () => {
    if (!current.action) return 'Ready to start Quick Sort';
    
    switch (current.action) {
      case 'start':
        return 'Starting Quick Sort algorithm - preparing to sort the array';
      case 'pivot':
        return `Selecting pivot element: ${current.array[current.comparing[0]]} - this will be our reference point for partitioning`;
      case 'partition-start':
        return `Starting partition around pivot ${current.array[current.comparing[0]]} - elements < pivot go left, >= pivot go right`;
      case 'compare':
        return `Comparing element with pivot to determine placement in partition`;
      case 'less':
        return 'Element is less than pivot - will be placed in left partition';
      case 'greater':
        return 'Element is greater than or equal to pivot - will be placed in right partition';
      case 'swap':
        return 'Swapping elements to maintain proper partition order';
      case 'pivot-swap':
        return 'Placing pivot in its final sorted position';
      case 'pivot-placed':
        return 'Pivot is now in its final sorted position - this element is now sorted';
      case 'done':
        return '🎉 Quick Sort completed! Array is now fully sorted';
      default:
        return current.description || 'Processing...';
    }
  };

  const getProgressPercentage = () => {
    return steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;
  };

  return (
    <div className="visualizer-container">
      <div className="code-section">
        <pre>{`function quickSort(array):
  if length <= 1:
    return array
  
  pivot = choose pivot
  left = elements < pivot
  right = elements > pivot
  return quickSort(left) + pivot + quickSort(right)`}</pre>

        <div className="algorithm-info">
          <h3>Quick Sort Algorithm</h3>
          <p><strong>Time Complexity:</strong></p>
          <ul>
            <li>Best Case: O(n log n) - when pivot divides array evenly</li>
            <li>Average Case: O(n log n) - typically good performance</li>
            <li>Worst Case: O(n²) - when pivot is always smallest/largest</li>
          </ul>
          <p><strong>Space Complexity:</strong> O(log n) - recursion stack space</p>
          <p><strong>Stability:</strong> Unstable - may change relative order of equal elements</p>
          <p><strong>Strategy:</strong> Partition-based - uses pivot to divide and conquer</p>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
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
              current.comparing && current.comparing.includes(idx)
                ? current.action === 'swap'
                  ? 'swapping'
                  : current.action === 'pivot'
                    ? 'pivot'
                    : current.action === 'pivot-swap'
                      ? 'pivot-swap'
                      : current.action === 'pivot-placed'
                        ? 'pivot'
                        : current.action === 'partition-start'
                          ? 'partitioning'
                          : current.action === 'less'
                            ? 'less-than-pivot'
                            : current.action === 'greater'
                              ? 'greater-than-pivot'
                              : current.action === 'compare'
                                ? 'comparing'
                                : ''
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

export default QuickSortVisualizer;
