import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingListComponent} from './components/trainingList';

interface Props {
  trainings: Training[];
}

export const TrainingListPage = (props: Props) => {
  return (
    <div>
      <h2 className="jumbotron">Lemoncode Trainings</h2>
      <TrainingListComponent trainings={props.trainings} />
    </div>
  );
}
