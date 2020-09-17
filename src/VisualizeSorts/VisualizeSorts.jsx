import React, { Component, Fragment } from "react";
import {
  getQuickSortAnimations,
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getHeapSortAnimations,
  getInsertionSortAnimations,
  getRadixSortAnimations,
  getRadixStraightAnimations
} from "../Algorithms/AlgorithmsSorts.js";
import Visualizers from "./Visualizers.jsx";

// This is the main color of the array bars.
const PRIMARY_COLOR = "#c2e8ce";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#be7575";
// This is the color of the bits
const BIT_COLOR = "#F6AD7B";
// This is the color of the pivot
const PIVOT_COLOR = "yellow";
var timeOut = [];

export default class VisualizeSorts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationSpeed: 1,
      isAnimated: false,
      isSorted: false,
      array: [],
      arraySize: 200,
      binaryArraySize: 15,
      binaryType: 0,
      initArray: this.initArray,
      sortingType: 0, // 0 = numbers, 1 = binary, 2 = string search
      key: 0,
      title: "Sorting methods for numbers",
      subTitle: "Select a sorting type and a method for more details",
      animateKMP: false,
      animateBM: false
    };
  }

  componentDidMount() {
    this.initArrayOnWindowWidth(window.innerWidth);
  }
  clearAllTimeouts() {
    while (timeOut.length > 0) {
      clearTimeout(timeOut.pop());
    }
    this.setState({
      isAnimated: false,
      isSorted: true
    });
  }

  initBinaryArray() {
    this.clearAllTimeouts();
    const array = [];
    const key = this.state.key;
    for (let i = 0; i < this.state.binaryArraySize; i++) {
      let value = randomIntegerFromInterval(1, 63);
      !array.includes(value) ? array.push(value) : i--;
    }
    this.setState({
      array,
      isSorted: false,
      sortingType: 1,
      animationSpeed: 250,
      initArray: this.initBinaryArray,
      key: key + 1,
      title: "Sorting methods for binary numbers",
      subTitle: "Select a sorting type and a method for more details"
    });
  }

  initArray() {
    this.clearAllTimeouts();
    const array = [];
    const key = this.state.key;
    for (let i = 0; i < this.state.arraySize; i++) {
      array.push(randomIntegerFromInterval(5, 600));
    }
    this.setState({
      array,
      isSorted: false,
      sortingType: 0,
      initArray: this.initArray,
      key: key + 1,
      title: "Sorting methods for numbers",
      subTitle: "Select a sorting type and a method for more details"
    });
  }
  initArrayOnWindowWidth(windowWidth) {
    if (windowWidth < 1260 && windowWidth > 568) {
      this.setState(
        {
          arraySize: randomIntegerFromInterval(5, 40),
          isSorted: false
        },
        () => {
          this.initArray();
        }
      );
    } else if (windowWidth < 568) {
      this.setState(
        {
          arraySize: randomIntegerFromInterval(5, 20),
          isSorted: false
        },
        () => {
          this.initArray();
        }
      );
    } else if (this.state.array.length === 0) {
      this.initArray();
    }
  }

  animateHeapSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      title: "Heap Sort",
      subTitle:
        "Heap sort is based on the repeated selection of the biggest key among items using at every step a maximal heap of the remaining elements"
    });
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getHeapSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      this.animateColors(
        animations,
        auxiliaryArray,
        animationSpeed,
        animationsLength,
        i,
        nrTimeout++,
        PRIMARY_COLOR,
        SECONDARY_COLOR
      );
    }
  }

  animateColors(
    animations,
    auxiliaryArray,
    animationSpeed,
    animationsLength,
    i,
    nrTimeout,
    primary_color,
    secondary_color,
    isPivotted = false,
    pivot_color = PIVOT_COLOR
  ) {
    const key = this.state.key;
    const arrayBar = document.getElementsByClassName("array-bar");
    const [barOneIdx, indexOrHeight, isComparisson] = animations[i];
    if (isComparisson === 1) {
      const barOneStyle = arrayBar[barOneIdx].style;
      const barTwoStyle = arrayBar[indexOrHeight].style;
      const color = i % 2 === 0 ? secondary_color : primary_color;
      const pivotColor = i % 2 === 0 ? pivot_color : primary_color;
      timeOut.push(
        setTimeout(() => {
          nrTimeout++;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = isPivotted ? pivotColor : color;
          if (nrTimeout === animationsLength) {
            this.setState({
              isAnimated: false,
              array: auxiliaryArray,
              key: key + 1,
              isSorted: true
            });
          }
        }, i * animationSpeed)
      );
    } else {
      timeOut.push(
        setTimeout(() => {
          nrTimeout++;
          const barOneStyle = arrayBar[barOneIdx].style;
          barOneStyle.height = `${indexOrHeight}px`;
          const barPivot = document.getElementsByName(`${indexOrHeight}`)[0];
          barPivot.setAttribute(
            "name",
            arrayBar[barOneIdx].getAttribute("name")
          );
          arrayBar[barOneIdx].setAttribute("name", `${indexOrHeight}`);
          if (nrTimeout === animationsLength) {
            this.setState({
              isAnimated: false,
              array: auxiliaryArray,
              key: key + 1,
              isSorted: true
            });
          }
        }, i * animationSpeed)
      );
    }
  }

  animateMergeSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      title: "Merge Sort",
      subTitle:
        "Merge sort works on the principle of its name: 'merging'. We split the elements in smaller subsets until we get 1 element and then we start merging them in order"
    });
    const key = this.state.key;
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getMergeSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      const arrayBar = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBar[barOneIdx].style;
        const barTwoStyle = arrayBar[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        timeOut.push(
          setTimeout(() => {
            nrTimeout++;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * animationSpeed)
        );
      } else {
        timeOut.push(
          setTimeout(() => {
            nrTimeout++;
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBar[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            const barPivot = document.getElementsByName(`${newHeight}`)[0];
            barPivot.setAttribute(
              "name",
              arrayBar[barOneIdx].getAttribute("name")
            );
            arrayBar[barOneIdx].setAttribute("name", `${newHeight}`);
            if (nrTimeout === animationsLength) {
              this.setState({
                isAnimated: false,
                array: auxiliaryArray,
                key: key + 1,
                isSorted: true
              });
            }
          }, i * animationSpeed)
        );
      }
    }
  }

  animateQuickSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      title: "Quick Sort",
      subTitle:
        "Quick sort works on selecting a pivot (middle elem. in our case) and putting all smaller elem. before it and bigger elem. after it, splitting afterwards in two halves, continuing the process"
    });
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getQuickSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      this.animateColors(
        animations,
        auxiliaryArray,
        animationSpeed,
        animationsLength,
        i,
        nrTimeout++,
        PRIMARY_COLOR,
        SECONDARY_COLOR,
        true
      );
    }
  }

  animateBubbleSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      title: "Bubble Sort",
      subTitle:
        "Bubble sort compares everytime 2 neighboring elements, putting after one iteration the biggest element found at the end"
    });
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getBubbleSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      this.animateColors(
        animations,
        auxiliaryArray,
        animationSpeed,
        animationsLength,
        i,
        nrTimeout++,
        PRIMARY_COLOR,
        SECONDARY_COLOR
      );
    }
  }

  onChange = e => {
    e.persist();
    if (e.target.name === "animationSpeed") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      let maxValue =
        e.target.name === "arraySize"
          ? 200
          : e.target.name === "binaryArraySize"
          ? 20
          : 20;
      this.setState(
        {
          [e.target.name]:
            e.target.value <= maxValue ? e.target.value : maxValue
        },
        () => {
          if (e.target.name === "arraySize" && e.target.value <= maxValue) {
            this.initArray();
          } else if (
            e.target.name === "binaryArraySize" &&
            e.target.value <= maxValue
          ) {
            this.initBinaryArray();
          }
        }
      );
    }
  };

  animateInsertionSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      title: "Insertion Sort",
      subTitle:
        "Insertion sort always puts the ith element into its appropiate position, resulting in i - 1 sorted elements on every step"
    });
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getInsertionSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      this.animateColors(
        animations,
        auxiliaryArray,
        animationSpeed,
        animationsLength,
        i,
        nrTimeout++,
        PRIMARY_COLOR,
        SECONDARY_COLOR
      );
    }
  }

  /* SPECIAL THANKS TO POINTY FROM  STACK OVERFLOW
https://stackoverflow.com/a/10073788/11023871
*/
  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  resetTable() {
    let tdOfNumbers = document.getElementsByClassName("table_row");
    let i;
    for (i = 0; i < tdOfNumbers.length; i++) {
      tdOfNumbers[i].innerHTML = "";
    }
  }

  animateRadixStraightSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      binaryType: 1,
      title: "Straight Sort",
      subTitle:
        "Straight sort always puts the ith element into its appropiate position, resulting in i - 1 sorted elements on every step"
    });
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getRadixStraightAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    let reset = 1;
    var counter = 0;
    for (let i = 0; i < animationsLength; i++) {
      const [key, value, isTableMutation] = animations[i];
      const paragraphElements = document.getElementsByClassName("array-binary");
      if (isTableMutation) {
        timeOut.push(
          setTimeout(() => {
            nrTimeout++;
            if (reset) {
              this.resetTable();
              reset = 0;
              counter = 0;
            }
            if (i % 2 === 0) {
              let tdOfNumber = document.getElementById("col_" + key);
              let tdInnerHTML = tdOfNumber.innerHTML;
              tdOfNumber.innerHTML =
                tdInnerHTML + this.pad(value.toString(2), 6) + ", ";
            }
            let trOfKey = document.getElementById("row_" + key);
            let divOfNumber = document.getElementsByName(value)[0];
            const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            trOfKey.style.backgroundColor = color;
            divOfNumber.style.backgroundColor = color;
          }, i * animationSpeed)
        );
      } else {
        timeOut.push(
          setTimeout(() => {
            nrTimeout++;
            if (i % 2 === 0) {
              const tdOfNumber = document.getElementById("col_" + key);
              const tdInnerHTML = tdOfNumber.innerHTML;
              const tdInnerHTMLText = tdInnerHTML.substr(8);
              tdOfNumber.innerHTML = tdInnerHTMLText;

              const pOfNumber = paragraphElements[counter++];
              pOfNumber.setAttribute("name", value);
              const stringInnerHTML = this.pad(value.toString(2), 6);
              pOfNumber.innerHTML = stringInnerHTML;
            }
            if (nrTimeout === animationsLength) {
              this.setState({
                isAnimated: false,
                array: auxiliaryArray,
                key: key + 1,
                isSorted: true
              });
            }
            reset = 1;
          }, i * animationSpeed)
        );
      }
    }
  }

  animateRadixSort() {
    this.setState({
      isAnimated: true,
      isSorted: false,
      binaryType: 0,
      title: "Radix sort",
      subTitle:
        "Radix exchange sort finishes when all keys that begin with a 0 bit come before all keys that begin with a 1 bit. "
    });
    const key = this.state.key;
    const animationSpeed = this.state.animationSpeed;
    const auxiliaryArray = this.state.array.slice();
    const animations = getRadixSortAnimations(auxiliaryArray);
    const animationsLength = animations.length;
    let nrTimeout = 0;
    for (let i = 0; i < animationsLength; i++) {
      const [NumberIdx, nameOrIndex, isComparisson, nameOrIndexJ] = animations[
        i
      ];

      if (isComparisson === 1) {
        timeOut.push(
          setTimeout(() => {
            const arrayIndividualBitsI = document.getElementsByName(
              nameOrIndex
            )[0];
            const BitStyleI = arrayIndividualBitsI.style;

            const arrayIndividualBitsJ = document.getElementsByName(
              nameOrIndexJ
            )[0];
            const BitStyleJ = arrayIndividualBitsJ.style;
            const colorBitsI = i % 2 === 0 ? BIT_COLOR : PRIMARY_COLOR;
            const colorBitsJ = i % 2 === 0 ? BIT_COLOR : PRIMARY_COLOR;
            nrTimeout++;
            BitStyleI.backgroundColor = colorBitsI;
            BitStyleJ.backgroundColor = colorBitsJ;
          }, i * animationSpeed)
        );
      } else {
        timeOut.push(
          setTimeout(() => {
            const arrayBits = document.getElementsByClassName("array-binary");
            nrTimeout++;
            const Number2Div = document.getElementsByName(nameOrIndex)[0];
            const Number1Div = arrayBits[NumberIdx];
            const Number2DivName = Number2Div.getAttribute("name");
            Number2Div.setAttribute("name", Number1Div.getAttribute("name"));
            Number1Div.setAttribute("name", Number2DivName);
            /* swap innet HTML */
            const innerHTML = Number1Div.innerHTML;
            Number1Div.innerHTML = Number2Div.innerHTML;
            Number2Div.innerHTML = innerHTML;
            if (nrTimeout === animationsLength) {
              this.setState({
                isAnimated: false,
                array: auxiliaryArray,
                key: key + 1,
                isSorted: true
              });
            }
          }, i * animationSpeed)
        );
      }
    }
  }

  binarySorts() {
    this.initBinaryArray();
  }

  render() {
    const {
      array,
      isAnimated,
      animationSpeed,
      arraySize,
      binaryArraySize,
      isSorted,
      sortingType,
      key,
      title,
      subTitle,
      animateKMP,
      animateBM
    } = this.state;
    const numberSortingMethods = (
      <ul
        className="dropdown-menu dropdown-menu-right p-0"
        aria-labelledby="navbarDropdown"
        disabled={isAnimated}
      >
        <li>
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() => this.animateMergeSort()}
            disabled={isAnimated}
          >
            MergeSort
          </button>
        </li>
        <li>
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() => this.animateQuickSort()}
            disabled={isAnimated}
          >
            QuickSort
          </button>
        </li>
        <li>
          <button
            href="#"
            className="navbar-function-link  p-3 btn w-100"
            onClick={() => this.animateHeapSort()}
            disabled={isAnimated}
          >
            HeapSort
          </button>
        </li>
        <li>
          <button
            href="#"
            className="navbar-function-link my-auto p-3 btn w-100"
            onClick={() => this.animateBubbleSort()}
            disabled={isAnimated}
          >
            BubbleSort
          </button>
        </li>
        <li>
          <button
            href="#"
            className="navbar-function-link my-auto p-3 btn w-100"
            onClick={() => this.animateInsertionSort()}
            disabled={isAnimated}
          >
            InsertionSort
          </button>
        </li>
      </ul>
    );
    const binarySortingMethods = (
      <ul
        className="dropdown-menu dropdown-menu-right p-0"
        aria-labelledby="navbarDropdown"
      >
        <li className="nav-item  my-auto">
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() => this.animateRadixSort()}
            disabled={isAnimated}
          >
            RadixSort
          </button>
        </li>
        <li className="nav-item  my-auto">
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() => this.animateRadixStraightSort()}
            disabled={isAnimated}
          >
            RadixStraightSort
          </button>
        </li>
      </ul>
    );
    const patternSearchMethods = (
      <ul
        className="dropdown-menu dropdown-menu-right p-0"
        aria-labelledby="navbarDropdown"
      >
        <li className="nav-item  my-auto">
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() =>
              this.setState({ animateKMP: true, animateBM: false })
            }
            disabled={isAnimated}
          >
            Knuth-Morris-Pratt
          </button>
        </li>
        <li className="nav-item  my-auto">
          <button
            className="navbar-function-link  p-3 btn w-100"
            onClick={() =>
              this.setState({ animateBM: true, animateKMP: false })
            }
            disabled={isAnimated}
          >
            Boyer-Moore(bad character)
          </button>
        </li>
      </ul>
    );
    return (
      <Fragment>
        <nav
          id="navbar"
          className={` navbar navbar-expand-lg navbar-light bg-light fixed-top`}
          style={{ zIndex: "1", width: "100%" }}
        >
          <img
            className="navbar-brand"
            id="homeLink"
            src="./logo512.png"
            alt="VisualizeSortingMethods"
            height="80px"
            width="80px"
          />

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li
                className="nav-item"
                style={{ display: sortingType === 2 ? "none" : "list-item" }}
              >
                <div className="form-group p-3">
                  <label htmlFor="animationSpeed">AnimationSpeed (in ms)</label>
                  <input
                    className="form-control"
                    type="number"
                    id="animationSpeed"
                    name="animationSpeed"
                    value={animationSpeed}
                    onChange={this.onChange}
                    disabled={isAnimated}
                  />
                </div>
              </li>
              <li
                className="nav-item"
                style={{ display: sortingType === 2 ? "none" : "list-item" }}
              >
                <div className="form-group p-3">
                  <label htmlFor="arraySize">ArraySize (nr. bars)</label>
                  <input
                    className="form-control"
                    type="number"
                    max="200"
                    min="1"
                    id="arraySize"
                    name={
                      sortingType === 0
                        ? "arraySize"
                        : sortingType === 1
                        ? "binaryArraySize"
                        : ""
                    }
                    value={
                      sortingType === 0
                        ? arraySize
                        : sortingType === 1
                        ? binaryArraySize
                        : ""
                    }
                    onChange={this.onChange}
                    disabled={isAnimated}
                  />
                </div>
              </li>
              <li className="nav-item dropdown align-items-center my-auto">
                <button
                  className="p-3 dropdown-toggle btn navbar-function-link w-100"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  disabled={isAnimated}
                >
                  SortingType
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-right p-0"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="navbar-function-link btn p-3  w-100"
                      onClick={() => this.initArray()}
                    >
                      Number Sorts
                    </button>
                  </li>
                  <li>
                    <button
                      className="navbar-function-link btn p-3  w-100"
                      onClick={() => this.binarySorts()}
                    >
                      Binary Sorts
                    </button>
                  </li>
                  <li>
                    <button
                      className="navbar-function-link btn p-3  w-100"
                      onClick={() => this.setState({ sortingType: 2 })}
                    >
                      Pattern Search
                    </button>
                  </li>
                </ul>
              </li>
              <li
                className="nav-item my-auto"
                style={{ display: sortingType === 2 ? "none" : "list-item" }}
              >
                <button
                  className="navbar-function-link btn p-3 w-100"
                  onClick={() =>
                    sortingType === 0
                      ? this.initArray()
                      : sortingType === 1
                      ? this.initBinaryArray()
                      : ""
                  }
                >
                  Generate new array
                </button>
              </li>
              <li className="nav-item dropdown align-items-center my-auto">
                <button
                  className="p-3 dropdown-toggle btn navbar-function-link w-100"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  disabled={isAnimated}
                >
                  {sortingType === 0
                    ? "MethodsForNumbers"
                    : sortingType === 1
                    ? "MethodsForBinary"
                    : "Methods For Strings"}
                </button>
                {sortingType === 0
                  ? numberSortingMethods
                  : sortingType === 1
                  ? binarySortingMethods
                  : patternSearchMethods}
              </li>
            </ul>
          </div>
        </nav>
        <div
          className={` position-absolute w-100 flexbar-bars ${
            sortingType === 0 ? "h-100 mt-5" : "margin-top-navbar"
          }`}
        >
          <div className="container align-bars-center">
            <h1 className="title mt-1">
              {sortingType !== 2 ? title : "Search algorithms"}
            </h1>
            <h4 className=" sub-title mb-5">
              {sortingType !== 2 ? subTitle : "Select a searching method"}
            </h4>
            {array !== undefined && array.length > 0 ? (
              <Visualizers
                key={key}
                arrayInfo={{ array, isSorted, sortingType }}
                searchingAlgorithm={
                  sortingType === 2 ? { animateKMP, animateBM } : {}
                }
                binaryType={this.state.binaryType}
              ></Visualizers>
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
