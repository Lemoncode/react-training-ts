import {Training} from '../../../../models/training';
import {trainingFormValidations} from '../components/validations/trainingFormValidations';
import {trainingActionConstants} from '../../../../common/constants/actionConstants/trainingActionConstants';

export interface TrainingContentChangedPayload {
  fieldName: string;
  value: any;
  error: string;
}

export const trainingContentChangedAction = (training: Training, fieldName: string, value: any) => {
  const error = trainingFormValidations.validateField(training, fieldName, value);

  return {
    type: trainingActionConstants.TRAINING_CONTENT_CHANGED,
    payload: {
      fieldName,
      value,
      error,
    } as TrainingContentChangedPayload,
  }
};
