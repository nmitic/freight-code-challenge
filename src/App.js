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

// import ShipmentsDetail from './pages/ShipmentsDetail';
import './styles.scss';

const Loading = () => <div>'Loading...'</div>;

const SomeAsyncCpm = loadable(() => import('./someCpm'), {
  fallback: <Loading />
})

const ShipmentsDetail = loadable(() => import('./pages/ShipmentsDetail'), {
  fallback: <Loading />
})

const App = () => (
  <ConnectedRouter history={history}>
    <Link to="/shipments-detail/S1000">shipments-detail</Link>
    <Switch>
      <Route path="/" exact component={SomeAsyncCpm} />
      <Route path="/shipments-detail/:id" component={ShipmentsDetail} />
    </Switch>
  </ConnectedRouter>);

export default hot(App);