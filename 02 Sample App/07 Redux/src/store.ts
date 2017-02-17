import {createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {reducers, AppState} from './reducers';

export const store = createStore<AppState>(
  reducers,
  applyMiddleware(reduxThunk),
);
