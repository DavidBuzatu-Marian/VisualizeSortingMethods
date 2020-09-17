import React from 'react';

const NumberSortDrop = () => {
  return (
    <ul
      className='dropdown-menu dropdown-menu-right p-0'
      aria-labelledby='navbarDropdown'
      disabled={isAnimated}
    >
      <li>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.animateMergeSort()}
          disabled={isAnimated}
        >
          MergeSort
        </button>
      </li>
      <li>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.animateQuickSort()}
          disabled={isAnimated}
        >
          QuickSort
        </button>
      </li>
      <li>
        <button
          href='#'
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.animateHeapSort()}
          disabled={isAnimated}
        >
          HeapSort
        </button>
      </li>
      <li>
        <button
          href='#'
          className='navbar-function-link my-auto p-3 btn w-100'
          onClick={() => this.animateBubbleSort()}
          disabled={isAnimated}
        >
          BubbleSort
        </button>
      </li>
      <li>
        <button
          href='#'
          className='navbar-function-link my-auto p-3 btn w-100'
          onClick={() => this.animateInsertionSort()}
          disabled={isAnimated}
        >
          InsertionSort
        </button>
      </li>
    </ul>
  );
};

export default NumberSortDrop;
