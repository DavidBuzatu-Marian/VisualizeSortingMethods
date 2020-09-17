import { randomIntegerFromInterval } from './RandomInteger';

export const initArrayOnWindowWidth = (windowWidth) => {
  if (windowWidth < 1260 && windowWidth > 568) {
    this.setState(
      {
        arraySize: randomIntegerFromInterval(5, 40),
        isSorted: false,
      },
      () => {
        this.initArray();
      }
    );
  } else if (windowWidth < 568) {
    this.setState(
      {
        arraySize: randomIntegerFromInterval(5, 20),
        isSorted: false,
      },
      () => {
        this.initArray();
      }
    );
  } else if (this.state.array.length === 0) {
    this.initArray();
  }
};
