import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

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

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
