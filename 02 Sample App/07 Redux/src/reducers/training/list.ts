import {Training} from '../../models/training';
import {trainingActionConstants} from '../../common/constants/actionConstants/trainingActionConstants';

export const trainingListReducer = (state: Training[] = [], action) => {
  switch (action.type) {
    case trainingActionConstants.FETCH_TRAINING_LIST:
      return [...action.payload];
    default:
      return state;
  }
};
