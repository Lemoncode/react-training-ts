import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
const validate: any = require('validate.js');
import {Training} from '../../../models/training';
import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';
import {trainingFormConstraints} from './components/trainingFormConstraints';

interface Props {
  params: any
}

interface State {
  training: Training;
  trainingErrors: TrainingErrors;
}

export class TrainingEditPageContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      training: new Training(),
      trainingErrors: new TrainingErrors(),
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  public componentDidMount() {
    this.fetchTraining();
  }

  private fetchTraining() {
    const trainingId = Number(this.props.params.id) || 0;
    trainingAPI.fetchTrainingById(trainingId)
      .then((training) => {
        this.setState({
          training: {...training}
        })
      })
      .catch((error) => {
        toastr.remove();
        toastr.error(error);
      });
  }

  private onChange(fieldName, value) {
    const errors = validate.single(value, trainingFormConstraints[fieldName]);

    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      }
    });
  }

  private save(training: Training) {
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

  public render() {
    return (
      <TrainingEditPage
        training={this.state.training}
        onChange={this.onChange}
        save={this.save}
      />
    );
  }
}
