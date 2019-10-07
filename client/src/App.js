import React, { Suspense, useEffect } from 'react';
import './App.scss';

// import { Store } from './context/GlobalState'
import { Provider } from 'react-redux'
import { store } from './store'
import { loadUser } from './actions/authActions'
import Posts from './components/posts'

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
