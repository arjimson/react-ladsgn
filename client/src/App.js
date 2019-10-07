import React, { Suspense, useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux'
import { store } from './store'
import { loadUser } from './actions/authActions'

const DefaultLayout = React.lazy(() => import('./container/DefaultLayout/DefaultLayout'));
const loading = () => <div>Loading...</div>;

const App = () => {
  useEffect(() =>{
    store.dispatch(loadUser());
  })
  return (
    <Provider store={store} >
      <Suspense fallback={loading()}>
        <DefaultLayout />
      </Suspense>
    </Provider>
  )
}

export default App;
