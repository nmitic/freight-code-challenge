import { 
  Route, 
  Switch
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { history } from './store/config';
import React from 'react';
import loadable from '@loadable/component';

import ErrorBoundary from './components/ErrorBoundary';

import paths from './paths';
import Loading from './components/Loading';

const ShipmentsDetail = loadable(() => import('./pages/ShipmentsDetail'), {
  fallback: <Loading />
})

const Shipments = loadable(() => import('./pages/Shipments'), {
  fallback: <Loading />
})

const App = () => (
  <ConnectedRouter history={history}>
    <Switch>
        <Route path={paths.root} exact component={() => (
          <ErrorBoundary>
            <Shipments />
          </ErrorBoundary>
        )} />
        <Route path={`${paths.shipmentsDetail}/:id`} exact component={() => (
          <ErrorBoundary>
            <ShipmentsDetail />
          </ErrorBoundary>
        )} />
    </Switch>
  </ConnectedRouter>);

export default hot(App);