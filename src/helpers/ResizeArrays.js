import { setVisualizerState } from '../actions/visualizer';
import store from '../store';
import { initArray } from './InitializeArray';
import { randomIntegerFromInterval } from './RandomInteger';

export const initArrayOnWindowWidth = (windowWidth) => {
  if (windowWidth < 1260 && windowWidth > 568) {
    let arraySize = randomIntegerFromInterval(5, 40);
    store.dispatch(
      setVisualizerState({
        arraySize: arraySize,
        isSorted: false,
      })
    );
    initArray(arraySize);
  } else if (windowWidth < 568) {
    let arraySize = randomIntegerFromInterval(5, 20);
    store.dispatch(
      setVisualizerState({
        arraySize: arraySize,
        isSorted: false,
      })
    );
    initArray(arraySize);
  }
};
