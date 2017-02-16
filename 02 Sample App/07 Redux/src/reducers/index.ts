import {combineReducers} from 'redux';
import {LoginState, loginReducer} from './login';
import {TrainingState, trainingReducer} from './training';

export interface AppState {
  login: LoginState;
  training: TrainingState;
}

export const reducers = combineReducers<AppState>({
  login: loginReducer,
  training: trainingReducer,
});
