import React from 'react';

const BinarySortDrop = () => {
  return (
    <ul
      className='dropdown-menu dropdown-menu-right p-0'
      aria-labelledby='navbarDropdown'
    >
      <li className='nav-item  my-auto'>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.animateRadixSort()}
          disabled={isAnimated}
        >
          RadixSort
        </button>
      </li>
      <li className='nav-item  my-auto'>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.animateRadixStraightSort()}
          disabled={isAnimated}
        >
          RadixStraightSort
        </button>
      </li>
    </ul>
  );
};

export default BinarySortDrop;
