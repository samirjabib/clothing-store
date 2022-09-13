import { compose, applyMiddleware} from 'redux';

import logger from 'redux-logger';
  
import { legacy_createStore as createStore } from 'redux';

import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) =>{
    if(!action.type){
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    next(action);

    console.log('next state: ' ,store.getState());
}

const middlewares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;