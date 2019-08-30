import { hot } from 'react-hot-loader/root';
import React from 'react';
import loadable from '@loadable/component';

import './styles.scss';

const Loading = () => <div>'Loading bre..ddd..'</div>;

const SomeAsyncCpm = loadable(() => import('./someCpm'), {
  fallback: <Loading />
})

const App = () => (<div><SomeAsyncCpm /><h1>NIKOLOOOU!</h1></div>);

export default hot(App);