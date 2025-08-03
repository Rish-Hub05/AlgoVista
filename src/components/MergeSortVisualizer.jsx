// src/components/MergeSortVisualizer.jsx
import React, { useEffect, useState, useRef } from 'react';
import { getMergeSortSteps } from '../algorithms/mergeSortSteps';
import './MergeSortVisualizer.css';

function MergeSortVisualizer({ array }) {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const intervalRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const allSteps = getMergeSortSteps(array);
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

  const current = steps[currentStep] || { array: [], comparing: [], action: '', description: '', leftArray: [], rightArray: [] };

  const getStepDescription = () => {
    if (!current.action) return 'Ready to start Merge Sort';
    
    switch (current.action) {
      case 'start':
        return 'Starting Merge Sort - array will be divided and conquered';
      case 'divide':
        return 'Dividing array into two halves - applying divide and conquer strategy';
      case 'merge_start':
        return 'Beginning to merge two sorted subarrays';
      case 'compare':
        return 'Comparing elements from left and right subarrays to merge in sorted order';
      case 'overwrite':
        return 'Placing smaller element in the merged result';
      case 'leftover':
        return 'Inserting remaining elements from one of the subarrays';
      case 'done':
        return 'Merge Sort completed! Array is now sorted';
      default:
        return current.explanation || 'Processing...';
    }
  };

  const renderArrayBoxes = (array, startIndex = 0, className = 'array-box') => {
    return array.map((num, idx) => (
      <div
        className={`${className} ${
          current.comparing && current.comparing.includes(startIndex + idx)
            ? current.action === 'overwrite'
              ? 'swapping'
              : current.action === 'leftover'
                ? 'merging'
                : current.action === 'divide'
                  ? 'dividing'
                  : current.action === 'merge_start'
                    ? 'merging'
                    : 'comparing'
            : current.action === 'done'
              ? 'sorted'
              : ''
        }`}
        key={`${startIndex}-${idx}`}
        ref={(el) => (boxRefs.current[startIndex + idx] = el)}
      >
        {num}
      </div>
    ));
  };

  return (
    <div className="visualizer-container">
      <div className="code-section">
        <pre>{`function mergeSort(array):
  if length <= 1:
    return array
  
  mid = length / 2
  left = mergeSort(left half)
  right = mergeSort(right half)
  return merge(left, right)`}</pre>

        <div className="algorithm-info">
          <h3>Merge Sort Algorithm</h3>
          <p><strong>Time Complexity:</strong></p>
          <ul>
            <li>Best Case: O(n log n) - consistent performance</li>
            <li>Average Case: O(n log n) - divide and conquer</li>
            <li>Worst Case: O(n log n) - guaranteed performance</li>
          </ul>
          <p><strong>Space Complexity:</strong> O(n) - requires extra space for merging</p>
          <p><strong>Stability:</strong> Stable - maintains relative order of equal elements</p>
          <p><strong>Strategy:</strong> Divide and Conquer - recursively divides array into halves</p>
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
        {/* Show divided arrays when in divide phase */}
        {current.action === 'divide' && current.leftArray && current.rightArray ? (
          <div className="divided-arrays">
            <div className="array-section">
              <h4>Original Array</h4>
              <div className="sub-array">
                {renderArrayBoxes(current.array, 0, 'array-box original-array')}
              </div>
            </div>
            <div className="division-arrow">↓</div>
            <div className="divided-sections">
              <div className="array-section">
                <h4>Left Half</h4>
                <div className="sub-array">
                  {renderArrayBoxes(current.leftArray, 0, 'array-box left-array')}
                </div>
              </div>
              <div className="array-section">
                <h4>Right Half</h4>
                <div className="sub-array">
                  {renderArrayBoxes(current.rightArray, current.leftArray.length, 'array-box right-array')}
                </div>
              </div>
            </div>
          </div>
        ) : current.action === 'merge_start' && current.leftArray && current.rightArray ? (
          <div className="merge-arrays">
            <div className="array-section">
              <h4>Left Sorted Array</h4>
              <div className="sub-array">
                {renderArrayBoxes(current.leftArray, 0, 'array-box left-array')}
              </div>
            </div>
            <div className="merge-arrow">+</div>
            <div className="array-section">
              <h4>Right Sorted Array</h4>
              <div className="sub-array">
                {renderArrayBoxes(current.rightArray, current.leftArray.length, 'array-box right-array')}
              </div>
            </div>
            <div className="merge-arrow">=</div>
            <div className="array-section">
              <h4>Merged Result</h4>
              <div className="sub-array">
                {renderArrayBoxes(current.array, 0, 'array-box merged-array')}
              </div>
            </div>
          </div>
        ) : (
          /* Show regular array in other phases */
          <div className="regular-merged-array">
            {current.array.map((num, idx) => (
              <div
                className={`array-box ${
                  current.comparing && current.comparing.includes(idx)
                    ? current.action === 'overwrite'
                      ? 'swapping'
                      : current.action === 'leftover'
                        ? 'merging'
                        : current.action === 'divide'
                          ? 'dividing'
                          : current.action === 'merge_start'
                            ? 'merging'
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
        )}
      </div>
    </div>
  );
}

export default MergeSortVisualizer;
