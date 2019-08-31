import { 
  applyMiddleware, 
  combineReducers, 
  compose, 
  createStore 
} from 'redux';

import thunk from 'redux-thunk';
import shipments from './modules/shipments';
import { createBrowserHistory } from 'history';
import { 
  routerMiddleware, 
  connectRouter 
} from 'connected-react-router';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    shipments,
    router: connectRouter(history)
  }),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);
