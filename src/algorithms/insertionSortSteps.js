export function getInsertionSortSteps(array) {
  const steps = [];
  const arr = array.slice();
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        action: 'compare',
        explanation: `Comparing ${arr[j]} and ${key}`
      });
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        action: 'shift',
        explanation: `Shifting ${arr[j]} to position ${j + 1}`
      });
      j = j - 1;
    }
    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      comparing: [j + 1],
      action: 'insert',
      explanation: `Inserting ${key} at position ${j + 1}`
    });
  }
  steps.push({
    array: [...arr],
    comparing: [],
    action: 'done',
    explanation: `Sorting done`
  });
  return steps;
}
