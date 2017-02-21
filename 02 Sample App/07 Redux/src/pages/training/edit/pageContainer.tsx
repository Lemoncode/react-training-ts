import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../reducers';
import {Training} from '../../../models/training';
import {fetchTrainingStartAction} from './actions/fetchTraining';
import {trainingContentChangedAction} from './actions/trainingContentChanged';
import {saveTrainingStartAction} from './actions/saveTraining';
import {TrainingEditPage} from './page';

const mapStateToProps = (state: AppState, ownProps) => ({
  trainingId: Number(ownProps.params.id) || 0,
  training: state.training.edit.training,
  trainingErrors: state.training.edit.trainingErrors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrainingById: (id: number) => dispatch(fetchTrainingStartAction(id)),
  onChange: (training: Training, fieldName: string, value: any) =>
    dispatch(trainingContentChangedAction(training, fieldName, value)),
  save: (training: Training) => dispatch(saveTrainingStartAction(training)),
});

export const TrainingEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainingEditPage);
