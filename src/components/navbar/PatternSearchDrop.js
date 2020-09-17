import React from 'react';

const PatternSearchDrop = () => {
  return (
    <ul
      className='dropdown-menu dropdown-menu-right p-0'
      aria-labelledby='navbarDropdown'
    >
      <li className='nav-item  my-auto'>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.setState({ animateKMP: true, animateBM: false })}
          disabled={isAnimated}
        >
          Knuth-Morris-Pratt
        </button>
      </li>
      <li className='nav-item  my-auto'>
        <button
          className='navbar-function-link  p-3 btn w-100'
          onClick={() => this.setState({ animateBM: true, animateKMP: false })}
          disabled={isAnimated}
        >
          Boyer-Moore(bad character)
        </button>
      </li>
    </ul>
  );
};

export default PatternSearchDrop;
