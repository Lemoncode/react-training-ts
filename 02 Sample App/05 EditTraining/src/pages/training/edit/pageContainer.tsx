import * as React from 'react';
import * as toastr from 'toastr';
import {Training} from '../../../models/training';
import {TrainingEditPage} from './page';
import {trainingAPI} from '../../../rest-api/training/trainingAPI';

interface Props {
  params: any
}

interface State {
  training: Training;
}

export class TrainingEditPageContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      training: new Training(),
    };
  }

  public componentDidMount() {
    this.fetchTraining();
  }

  private fetchTraining() {
    toastr.remove();
    const trainingId = Number(this.props.params.id) || 0;
    trainingAPI.fetchTrainingById(trainingId)
      .then((training) => {
        this.setState({
          training: {...training}
        })
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  private onChange(fieldName, value) {
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
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  public render() {
    return (
      <TrainingEditPage
        training={this.state.training}
        onChange={this.onChange.bind(this)}
        save={this.save.bind(this)}
      />
    );
  }
}
