import {combineReducers} from 'redux';
import {Training} from '../../models/training';
import {trainingListReducer} from './list';

export interface TrainingState {
  list: Training[];
}

export const trainingReducer = combineReducers<TrainingState>({
  list: trainingListReducer,
});
