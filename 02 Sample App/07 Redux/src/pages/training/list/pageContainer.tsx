import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../reducers';
import {Training} from '../../../models/training';
import {fetchTrainingsStartAction} from './actions/fetchTrainings';
import {TrainingListPage} from './page';

const mapStateToProps = (state: AppState) => ({
  trainings: state.training.list,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrainings: () => dispatch(fetchTrainingsStartAction()),
});

export const TrainingListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrainingListPage);
