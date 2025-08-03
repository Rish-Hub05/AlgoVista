// src/algorithms/bubbleSortSteps.js
export function getBubbleSortSteps(arr) {
  const steps = [];
  const newArr = [...arr];

  steps.push({ array: [...newArr], comparing: [], action: 'start' });

  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length - i - 1; j++) {
      steps.push({ array: [...newArr], comparing: [j, j + 1], action: 'compare' });
      if (newArr[j] > newArr[j + 1]) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        steps.push({ array: [...newArr], comparing: [j, j + 1], action: 'swap' });
      }
    }
  }

  steps.push({ array: [...newArr], comparing: [], action: 'done' });
  return steps;
}
