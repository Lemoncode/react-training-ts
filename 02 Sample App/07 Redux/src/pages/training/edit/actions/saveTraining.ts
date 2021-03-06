import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {Training} from '../../../../models/training';
import {TrainingErrors} from '../../../../models/trainingErrors';
import {trainingAPI} from '../../../../rest-api/training/trainingAPI';
import {trainingFormValidations} from '../components/validations/trainingFormValidations';
import {trainingActionConstants} from '../../../../common/constants/actionConstants/trainingActionConstants';

export const saveTrainingStartAction = (training: Training) => {
  return (dispatcher) => {
    const trainingErrors = trainingFormValidations.validateForm(training);
    dispatcher(saveTrainingCompleteAction(trainingErrors));

    if (trainingFormValidations.isValidForm(trainingErrors)) {
      toastr.remove();
      trainingAPI.save(training)
        .then((message) => {
          toastr.success(message);
          hashHistory.goBack();
        })
        .catch((error) => {
          toastr.error(error);
        });
    }
  };
};


const saveTrainingCompleteAction = (trainingErrors: TrainingErrors) => ({
  type: trainingActionConstants.SAVE_TRAINING,
  payload: trainingErrors,
});
