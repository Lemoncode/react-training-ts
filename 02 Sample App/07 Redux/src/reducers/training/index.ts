import {combineReducers} from 'redux';
import {Training} from '../../models/training';
import {trainingListReducer} from './list';
import {TrainingEditState, trainingEditReducer} from './edit';

export interface TrainingState {
  list: Training[];
  edit: TrainingEditState;
}

export const trainingReducer = combineReducers<TrainingState>({
  list: trainingListReducer,
  edit: trainingEditReducer,
});
