import { 
  applyMiddleware, 
  combineReducers, 
  compose, 
  createStore 
} from 'redux';

import thunk from 'redux-thunk';
import shipments from './modules/shipments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({shipments}),
  composeEnhancers(applyMiddleware(thunk)),
);
