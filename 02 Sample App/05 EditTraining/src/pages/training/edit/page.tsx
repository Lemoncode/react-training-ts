import * as React from 'react';
import {Training} from '../../../models/training';
import {TrainingFormComponent} from './components/trainingForm';

interface State {
  training: Training;
}

export class TrainingEditPage extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      training: {id: 1, name:'Test Name', url: 'testUrl', startDate: 1487123522370, endDate: 1, isActive: true},
    };
  }
  private onChange(fieldName, value) {
    this.setState({
      training: {
        ...this.state.training,
        [fieldName]: value
      }
    });
  }

  public render() {
    return (
      <div>
        <h2 className="jumbotron">Edit Training</h2>
        <TrainingFormComponent
          training={this.state.training}
          onChange={this.onChange.bind(this)}
          save={() =>{}}
        />
      </div>
    );
  }
}
