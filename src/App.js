import React, { Fragment } from 'react';
import VisualizeSorts from './VisualizeSorts/VisualizeSorts';
import './VisualizeSorts/VisualizeSorts.css';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Fragment>
          <VisualizeSorts></VisualizeSorts>
        </Fragment>
      </div>
    </Provider>
  );
};

export default App;
