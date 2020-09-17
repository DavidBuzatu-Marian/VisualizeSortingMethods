import { setVisualizerState } from '../actions/visualizer';
import store from '../store';

export const clearAllTimeouts = (timeOut) => {
  while (timeOut.length > 0) {
    clearTimeout(timeOut.pop());
  }
  store.dispatch(
    setVisualizerState({
      isAnimated: false,
      isSorted: true,
    })
  );
};
