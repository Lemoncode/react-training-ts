import * as toastr from 'toastr';
import {Training} from '../../../../models/training';
import {trainingAPI} from '../../../../rest-api/training/trainingAPI';
import {trainingActionConstants} from '../../../../common/constants/actionConstants/trainingActionConstants';

export const fetchTrainingStartAction = (id: number) => {
  return (dispatcher) => {
    const promise = trainingAPI.fetchTrainingById(id);

    promise.then((training) => {
      dispatcher(fetchTrainingCompleteAction(training));
    })
    .catch((error) => {
      toastr.remove();
      toastr.error(error);
    });

    return promise;
  };
};

const fetchTrainingCompleteAction = (training: Training) => ({
  type: trainingActionConstants.FETCH_TRAINING_ENTITY,
  payload: training,
});
