import * as React from 'react';
import {Training} from '../../../../models/training';
import {TrainingHeadComponent} from './trainingHead';
import {TrainingRowComponent} from './trainingRow';

interface Props {
  trainings: Training[];
}

export const TrainingListComponent = (props: Props) => {
  return (
    <table className="table">
      <TrainingHeadComponent />
      <tbody>
        {
          props.trainings.map((training) => (
            <TrainingRowComponent
              key={training.id}
              training={training}
            />
          ))
        }
      </tbody>
    </table>
  );
};
