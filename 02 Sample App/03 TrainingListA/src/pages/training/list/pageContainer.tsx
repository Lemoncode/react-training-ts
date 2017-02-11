import * as React from 'react';
import * as toastr from 'toastr';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
import {Training} from '../../../models/training';
import {TrainingListPage} from './page';

interface State {
  trainings: Training[];
}

export class TrainingListPageContainer extends React.Component <{}, State> {
  constructor() {
    super();
    this.state = {
      trainings: [],
    };

    this.fetchTrainings();
  }

  // We are creating new array from trainings from API
  // Spread operator is available for arrays too.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
  // Other way to do same:
  // var newTrainings = [].concat(trainings);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
  private fetchTrainings() {
    trainingAPI.fetchTrainings()
      .then((trainings) => {
        this.setState({
          trainings: [...trainings],
        });
      })
      .catch(() => {
        toastr.error('Something was wrong when fetching trainings :(');
      });
  }

  public render() {
    return (
      <TrainingListPage trainings={this.state.trainings} />
    );
  }
}
