import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingListComponent} from './components/trainingList';

interface Props {
  trainings: Training[];
  fetchTrainings: () => void;
}

export class TrainingListPage extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.fetchTrainings();
  }

  public render() {
    return (
      <div>
        <h2 className="jumbotron">Lemoncode Trainings</h2>
        <TrainingListComponent trainings={this.props.trainings} />
      </div>
    );
  }
}
