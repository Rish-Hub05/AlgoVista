export function getMergeSortSteps(array) {
  const steps = [];
  const arr = array.slice();

  // Add initial step
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'start',
    explanation: 'Starting Merge Sort - array will be divided and conquered'
  });

  // First, create all the division steps to show the tree structure
  function createDivisionSteps(arr, level = 0, startIdx = 0) {
    if (arr.length <= 1) {
      return;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Add division step
    steps.push({
      array: [...arr],
      comparing: [startIdx, startIdx + mid - 1, startIdx + arr.length - 1],
      action: 'divide',
      explanation: `Dividing array [${arr.join(', ')}] into two halves`,
      leftArray: left,
      rightArray: right,
      level: level
    });
    
    // Recursively divide left and right halves
    createDivisionSteps(left, level + 1, startIdx);
    createDivisionSteps(right, level + 1, startIdx + mid);
  }

  // Create all division steps first
  createDivisionSteps(arr);

  // Now perform the actual merge sort and add merge steps
  function mergeSort(arr, l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }

  function merge(arr, l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    // Add merge start step
    steps.push({
      array: [...arr],
      comparing: [l, m, r],
      action: 'merge_start',
      explanation: `Merging sorted subarrays from ${l} to ${m} and ${m+1} to ${r}`,
      leftArray: left,
      rightArray: right
    });

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...arr],
        comparing: [k],
        action: 'compare',
        explanation: `Comparing ${left[i]} and ${right[j]} - choosing smaller element`
      });
      
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
        steps.push({
          array: [...arr],
          comparing: [k],
          action: 'overwrite',
          explanation: `Placed ${arr[k]} from left subarray at position ${k}`
        });
      } else {
        arr[k] = right[j++];
        steps.push({
          array: [...arr],
          comparing: [k],
          action: 'overwrite',
          explanation: `Placed ${arr[k]} from right subarray at position ${k}`
        });
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i++];
      steps.push({
        array: [...arr],
        comparing: [k],
        action: 'leftover',
        explanation: `Inserted remaining element ${arr[k]} from left subarray`
      });
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j++];
      steps.push({
        array: [...arr],
        comparing: [k],
        action: 'leftover',
        explanation: `Inserted remaining element ${arr[k]} from right subarray`
      });
      k++;
    }
  }

  mergeSort(arr, 0, arr.length - 1);
  
  // Add completion step
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'done',
    explanation: 'Merge Sort completed! Array is now sorted'
  });
  
  return steps;
}
