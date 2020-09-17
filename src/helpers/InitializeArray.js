import { randomIntegerFromInterval } from './RandomInteger';
import { clearAllTimeouts } from './ClearTimeout';
import { store } from '../store';
import { setVisualizerState } from '../actions/visualizer';

export const initArray = (arraySize) => {
  clearAllTimeouts();
  const array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(randomIntegerFromInterval(5, 600));
  }

  store.dispatch(
    setVisualizerState({
      array,
      isSorted: false,
      sortingType: 0,
      title: 'Sorting methods for numbers',
      subTitle: 'Select a sorting type and a method for more details',
    })
  );
};

export const initBinaryArray = (binaryArraySize) => {
  clearAllTimeouts();
  const array = [];
  for (let i = 0; i < binaryArraySize; i++) {
    let value = randomIntegerFromInterval(1, 63);
    !array.includes(value) ? array.push(value) : i--;
  }
  store.dispatch(
    setVisualizerState({
      array,
      isSorted: false,
      sortingType: 1,
      animationSpeed: 250,
      title: 'Sorting methods for binary numbers',
      subTitle: 'Select a sorting type and a method for more details',
    })
  );
};
