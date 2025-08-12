export function getQuickSortSteps(array) {
  const steps = [];
  const arr = array.slice();

  function quickSort(arr, low, high) {
    if (low < high) {
      // Add step to show pivot selection
      steps.push({
        array: [...arr],
        comparing: [high],
        action: 'pivot',
        description: `Selecting pivot element: ${arr[high]}`
      });

      let pi = partition(arr, low, high);
      
      // Add step to show pivot placement
      steps.push({
        array: [...arr],
        comparing: [pi],
        action: 'pivot-placed',
        description: `Pivot ${arr[pi]} placed in final position ${pi}`
      });

      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    
    // Add step to show partition start
    steps.push({
      array: [...arr],
      comparing: [high],
      action: 'partition-start',
      description: `Starting partition around pivot ${pivot}`
    });

    for (let j = low; j < high; j++) {
      // Show comparison step
      steps.push({
        array: [...arr],
        comparing: [j, high],
        action: 'compare',
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        // Show element is less than pivot
        steps.push({
          array: [...arr],
          comparing: [j],
          action: 'less',
          description: `${arr[j]} < ${pivot}, will place in left partition`
        });

        i++;
        if (i !== j) {
          // Show swap step
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [i, j],
            action: 'swap',
            description: `Swapping ${arr[i]} and ${arr[j]} to maintain partition order`
          });
        }
      } else {
        // Show element is greater than pivot
        steps.push({
          array: [...arr],
          comparing: [j],
          action: 'greater',
          description: `${arr[j]} >= ${pivot}, will place in right partition`
        });
      }
    }

    // Final pivot placement
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      action: 'pivot-swap',
      description: `Placing pivot ${pivot} in final position ${i + 1}`
    });

    return i + 1;
  }

  // Add initial step
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'start',
    description: 'Starting Quick Sort algorithm'
  });

  quickSort(arr, 0, arr.length - 1);
  
  // Add completion step
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'done',
    description: 'Quick Sort completed! Array is now sorted'
  });

  return steps;
}
