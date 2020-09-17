import React from 'react';

const Navbar = () => {
  return (
    <nav className='nav'>
      {/* <button
            className="btn"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
      <div className='navbar'>
        <ul>
          <li
            className='navbar-item'
            style={{ display: sortingType === 2 ? 'none' : 'list-item' }}
          >
            <div className='input-group'>
              <label htmlFor='animationSpeed'>AnimationSpeed (in ms)</label>
              <input
                className='form-control'
                type='number'
                id='animationSpeed'
                name='animationSpeed'
                value={animationSpeed}
                onChange={this.onChange}
                disabled={isAnimated}
              />
            </div>
          </li>
          <li
            className='navbar-item'
            style={{ display: sortingType === 2 ? 'none' : 'list-item' }}
          >
            <div className='input-group'>
              <label htmlFor='arraySize'>ArraySize (nr. bars)</label>
              <input
                className='form-control'
                type='number'
                max='200'
                min='1'
                id='arraySize'
                name={
                  sortingType === 0
                    ? 'arraySize'
                    : sortingType === 1
                    ? 'binaryArraySize'
                    : ''
                }
                value={
                  sortingType === 0
                    ? arraySize
                    : sortingType === 1
                    ? binaryArraySize
                    : ''
                }
                onChange={this.onChange}
                disabled={isAnimated}
              />
            </div>
          </li>
          <li className='navbar-item dropdown'>
            <button
              className='btn btn-dropdown-toggle'
              id='navbarDropdown'
              disabled={isAnimated}
            >
              SortingType
            </button>
            <ul className='dropdown-menu'>
              <li>
                <button onClick={() => this.initArray()}>Number Sorts</button>
              </li>
              <li>
                <button onClick={() => this.binarySorts()}>Binary Sorts</button>
              </li>
              <li>
                <button onClick={() => this.setState({ sortingType: 2 })}>
                  Pattern Search
                </button>
              </li>
            </ul>
          </li>
          <li
            className='navbar-item'
            style={{ display: sortingType === 2 ? 'none' : 'list-item' }}
          >
            <button
              className='btn btn-init'
              onClick={() =>
                sortingType === 0
                  ? this.initArray()
                  : sortingType === 1
                  ? this.initBinaryArray()
                  : ''
              }
            >
              Generate new array
            </button>
          </li>
          <li className='navbar-item dropdown'>
            <button className='btn btn-dropdown-toggle' disabled={isAnimated}>
              {sortingType === 0
                ? 'MethodsForNumbers'
                : sortingType === 1
                ? 'MethodsForBinary'
                : 'Methods For Strings'}
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
  );
};

export default Navbar;
