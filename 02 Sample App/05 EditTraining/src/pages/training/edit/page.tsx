import * as React from 'react';
import {TrainingFormComponent} from './components/trainingForm';

export const TrainingEditPage = () => {
  return (
    <div>
      <h2 className="jumbotron">Edit Training</h2>
      <TrainingFormComponent
        training={{id: 1, name:'Test Name', url: 'testUrl', startDate: 1, endDate: 1, isActive: true}}        onChange={() => {}}
        save={() =>{}}
      />
    </div>
  );
}
