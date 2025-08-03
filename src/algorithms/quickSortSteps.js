export function getQuickSortSteps(array) {
  const steps = [];
  const arr = array.slice();

  function quickSort(arr, low, high) {
    if (low < high) {
      let pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        action: 'compare',
        explanation: `Comparing ${arr[j]} with pivot ${pivot}`
      });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [i, j],
          action: 'swap',
          explanation: `Swapping ${arr[i]} and ${arr[j]}`
        });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      action: 'pivot-swap',
      explanation: `Swapping pivot ${pivot} to position ${i + 1}`
    });
    return i + 1;
  }

  quickSort(arr, 0, arr.length - 1);
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'done',
    explanation: `Sorting done`
  });

  return steps;
}
