import rootReducer from  '../reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = applyMiddleware(thunk)(createStore)(rootReducer,
  typeof window !== 'undefined' && window.devToolsExtension &&
  window.devToolsExtension()
);

export default() => {
  return store;
};
