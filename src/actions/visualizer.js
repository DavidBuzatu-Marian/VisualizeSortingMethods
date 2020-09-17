import { SET_STATE } from './types';

export const setVisualizerState = (newState) => (dispatch) => {
  dispatch({
    type: SET_STATE,
    payload: newState,
  });
};
