import { 
  Route, 
  Link,
  Switch
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { history } from './store/config';
import React from 'react';
import loadable from '@loadable/component';

import './styles.scss';

const Loading = () => <div>'Loading...'</div>;

const SomeAsyncCpm = loadable(() => import('./someCpm'), {
  fallback: <Loading />
})

const App = () => (
  <ConnectedRouter history={history}>
    <Route path="/" component={SomeAsyncCpm} />
  </ConnectedRouter>);

export default hot(App);