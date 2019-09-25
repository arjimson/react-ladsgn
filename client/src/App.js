import React, { Component, Suspense } from 'react';
import './App.scss';

import { Store } from './context/GlobalState'

const DefaultLayout = React.lazy(() => import('./container/DefaultLayout/DefaultLayout'));

const loading = () => <div>Loading...</div>;

class App extends Component {

  render() {
    return (
      <Store>
        <Suspense fallback={loading()}>
          <DefaultLayout />
        </Suspense>
      </Store>
    )
  }
}

export default App;
