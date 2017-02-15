import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingFormComponent} from './components/trainingForm';

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

export const TrainingEditPage = (props: Props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponent
        training={props.training}
        onChange={props.onChange}
        save={props.save}
      />
    </div>
  );
}
