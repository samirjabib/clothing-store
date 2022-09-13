import { compose, applyMiddleware} from 'redux';

import logger from 'redux-logger';
  
import { legacy_createStore as createStore } from 'redux';

import { rootReducer } from './root-reducer';

const middlewares = [logger]

const composedEnhancers = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;