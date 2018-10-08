import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import jsonp from '../../middlewares/jsonp';

const middleware = [thunk, jsonp];
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

const finalCreateStore = compose(
  applyMiddleware(...middleware)
)(createStore);

export default initialState => {
  const store = finalCreateStore(rootReducer, initialState);
  return store;
};
