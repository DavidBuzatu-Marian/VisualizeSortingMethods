export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.lenght < 1) {
    return array;
  }
  quickSort(array, animations, 0, array.length - 1);
  return animations;
}

function swap(items, animations, leftIndex, rightIndex) {
  // push the index and the height of the element we swap
  animations.push([leftIndex, items[rightIndex], 0]);
  animations.push([rightIndex, items[leftIndex], 0]);
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, animations, left, right) {
  let middleCoord = Math.floor((right + left) / 2);
  let pivot = items[middleCoord],
    i = left,
    j = right;
  while (i <= j) {
    middleCoord = items.indexOf(pivot);
    while (items[i] < pivot) {
      animations.push([i, middleCoord, 1]);
      animations.push([i, middleCoord, 1]);
      i++;
    }
    while (items[j] > pivot) {
      animations.push([j, middleCoord, 1]);
      animations.push([j, middleCoord, 1]);
      j--;
    }
    if (i <= j) {
      swap(items, animations, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, animations, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, animations, left, right);
    if (left < index - 1) {
      quickSort(items, animations, left, index - 1);
    }
    if (index < right) {
      quickSort(items, animations, index, right);
    }
  }
  return items;
}

// algorithm from algoexpert.com for optimized merge sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j, 1]);
    animations.push([i, j, 1]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i], 0]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j], 0]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i, 1]);
    animations.push([i, i, 1]);
    animations.push([k, auxiliaryArray[i], 0]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j, 1]);
    animations.push([j, j, 1]);
    animations.push([k, auxiliaryArray[j], 0]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length < 2) {
    return array;
  }

  bubbleSort(array, array.length, animations);
  return animations;
}

function bubbleSort(array, arrayLength, animations) {
  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < arrayLength - 1 - i; j++) {
      animations.push([j, j + 1, 1]);
      animations.push([j, j + 1, 1]);
      if (array[j] > array[j + 1]) {
        swap(array, animations, j, j + 1);
      }
    }
  }
}

/* ***************
    HEAP SORT
 *************** */

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length < 2) {
    return array;
  }
  heapSort(array, array.length, animations);
  return animations;
}

function compareParentWithChildren(array, length, index, animations) {
  let parent = index;
  let left = index * 2 + 1;
  let right = left + 1;
  /* check if left child is greater. If it is
   * parent will take its index.
   * check if left is smaller than length
   * in order to not compare with already sorted nodes
   */
  if (left < length) {
    animations.push([left, parent, 1]);
    animations.push([left, parent, 1]);
    if (array[left] > array[parent]) {
      parent = left;
    }
  }
  /* check if right child is greater. If it is
   * parent will take its index
   */
  if (right < length) {
    animations.push([right, parent, 1]);
    animations.push([right, parent, 1]);
    if (array[right] > array[parent]) {
      parent = right;
    }
  }
  /* check if we found another value greater than initial parent
   * swap values and recall function
   */
  animations.push([parent, index, 1]);
  animations.push([parent, index, 1]);
  if (parent !== index) {
    swap(array, animations, index, parent);
    /* check if nodes below are still in right order */
    compareParentWithChildren(array, length, parent, animations);
  }
}

function heapSort(array, length, animations) {
  let indexOfLastParent = Math.floor(length / 2 - 1);
  let indexOfLastChild = length - 1;

  while (indexOfLastParent >= 0) {
    compareParentWithChildren(array, length, indexOfLastParent, animations);
    indexOfLastParent--;
  }
  while (indexOfLastChild >= 0) {
    /* swap root with last child because it is sorted */
    swap(array, animations, 0, indexOfLastChild);
    compareParentWithChildren(array, indexOfLastChild, 0, animations);
    indexOfLastChild--;
  }

  return array;
}

/* STRAIGHT INSERTION */

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length < 2) {
    return array;
  }
  insertionSort(array, array.length, animations);
  return animations;
}

function insertionSort(array, length, animations) {
  let i, j;
  for (i = 1; i < length; ++i) {
    for (j = i; j > 0 && array[j - 1] > array[j]; --j) {
      animations.push([j - 1, j, 1]);
      animations.push([j - 1, j, 1]);
      swap(array, animations, j, j - 1);
    }
  }
}

/* RADIX SORT */

export function getRadixSortAnimations(array) {
  const animations = [];
  if (array.length < 2) {
    return array;
  }
  radixSort(array, 0, array.length - 1, animations, 5, 1);
  console.log(array);
  return animations;
}

function radixSort(array, left, right, animations, nrBits, paddingForName) {
  if (right > left && nrBits >= 0) {
    let i = left;
    let j = right;
    do {
      while (getKthBit(array[i], nrBits) === 0 && i < j) {
        i++;
      }

      while (getKthBit(array[j], nrBits) === 1 && i < j) {
        j--;
      }
      if (i < j) {
        animations.push([
          i,
          pad(array[i].toString(2), 6) + pad(1, paddingForName),
          1,
          pad(array[j].toString(2), 6) + pad(0, paddingForName)
        ]);
        animations.push([
          i,
          pad(array[i].toString(2), 6) + pad(1, paddingForName),
          1,
          pad(array[j].toString(2), 6) + pad(0, paddingForName)
        ]);
      }

      swap(array, animations, i, j);
    } while (j !== i);

    if (getKthBit(array[right], nrBits) === 0) {
      j++;
    }
    radixSort(array, left, j - 1, animations, nrBits - 1, paddingForName + 1);
    radixSort(array, j, right, animations, nrBits - 1, paddingForName + 1);
  }
}

function getKthBit(x, k) {
  return (x >> k) & 1;
}

/* RADIX STRAIGHT SORT */
export function getRadixStraightAnimations(array) {
  const animations = [];
  if (array.length < 2) {
    return array;
  }
  radixStraight(array, array.length, animations);
  console.log(array);
  return animations;
}

function radixStraight(array, arrLength, animations) {
  let i = 0,
    nrBits = 6,
    mask = 2,
    nrPasses = 0;
  for (nrPasses = 0; nrPasses < nrBits / mask; nrPasses++) {
    let counter = 0;
    let tableCount = { 0: [], 1: [], 2: [], 3: [] };
    for (i = 0; i < arrLength; i++) {
      let key = getMBits(array[i], mask, nrPasses * mask).toString();
      tableCount[key].push(array[i]);
      animations.push([key, array[i], 1]);
      animations.push([key, array[i], 1]);
    }

    for (var key in tableCount) {
      while (tableCount[key].length > 0) {
        array[counter++] = tableCount[key].shift();
        animations.push([key, array[counter - 1], 0]);
        animations.push([key, array[counter - 1], 0]);
      }
    }
  }
}

function getMBits(number, m, shiftValue) {
  return (number >> shiftValue) & ~(~0 << m);
}

/* SPECIAL THANKS TO POINTY FROM  STACK OVERFLOW
https://stackoverflow.com/a/10073788/11023871
*/
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
