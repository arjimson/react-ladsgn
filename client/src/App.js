import React, { Component, Suspense } from 'react';
import './App.scss';

const DefaultLayout = React.lazy(() => import('./container/DefaultLayout/DefaultLayout'));

const loading = () => <div>Loading...</div>;

class App extends Component {

  render() {
    return (
      <Suspense fallback={loading()}>
        <DefaultLayout/>
      </Suspense>
    )
  }
}

export default App;
