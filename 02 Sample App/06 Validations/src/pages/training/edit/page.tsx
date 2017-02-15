import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingFormComponentContainer} from './components/trainingFormContainer';

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

export const TrainingEditPage = (props: Props) => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponentContainer
        training={props.training}
        onChange={props.onChange}
        save={props.save}
      />
    </div>
  );
}
