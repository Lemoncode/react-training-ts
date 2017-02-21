import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingErrors} from '../../../models/trainingErrors';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';

interface Props {
  trainingId: number;
  training: Training;
  trainingErrors: TrainingErrors;
  fetchTrainingById: (id: number) =>  void;
  onChange: (training: Training, fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

export class TrainingEditPage extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.fetchTrainingById(this.props.trainingId);
  }

  public render() {
    return (
      <div>
        <h2 className="jumbotron">Edit Training</h2>
        <TrainingFormComponentContainer
          training={this.props.training}
          trainingErrors={this.props.trainingErrors}
          onChange={this.props.onChange}
          save={this.props.save}
        />
      </div>
    );
  }
}
