import {combineReducers} from 'redux';
import {LoginState, loginReducer} from './login';

export interface AppState {
  login: LoginState;
}

export const reducers = combineReducers<AppState>({
  login: loginReducer,
});
