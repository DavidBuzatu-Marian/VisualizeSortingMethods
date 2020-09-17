import { SET_STATE } from '../actions/types';

const initialState = {
  animationSpeed: 1,
  isAnimated: false,
  isSorted: false,
  array: [],
  arraySize: 200,
  binaryArraySize: 15,
  binaryType: 0,
  sortingType: 0, // 0 = numbers, 1 = binary, 2 = string search
  title: 'Sorting methods for numbers',
  subTitle: 'Select a sorting type and a method for more details',
  animateKMP: false,
  animateBM: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
