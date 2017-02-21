import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
import {TrainingErrors} from '../../../../models/trainingErrors';
import {TrainingFormComponent} from './trainingForm';

interface Props {
  training: Training;
  trainingErrors: TrainingErrors;
  onChange: (training: Training, fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

interface State {
  isOpenStartDateModal: boolean;
  isOpenEndDateModal: boolean;
}

export class TrainingFormComponentContainer extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isOpenStartDateModal: false,
      isOpenEndDateModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
    this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  private onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(this.props.training, fieldName, value);
  }

  private onChangeStartDate(date: moment.Moment) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  private onChangeEndDate(date: moment.Moment) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  private onChangeDate(fieldName: string, date: moment.Moment) {
    const milliseconds = date.valueOf();
    this.props.onChange(this.props.training, fieldName, milliseconds);
  }

  private toggleOpenStartDateModal() {
    this.toggleOpenModal('isOpenStartDateModal');
  }

  private toggleOpenEndDateModal() {
    this.toggleOpenModal('isOpenEndDateModal');
  }

  private toggleOpenModal(fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: !this.state[fieldName]
    });
  }

  private save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  public render() {
    return (
      <TrainingFormComponent
        training={this.props.training}
        trainingErrors={this.props.trainingErrors}
        onChange={this.onChange}
        save={this.save}
        isOpenStartDateModal={this.state.isOpenStartDateModal}
        toggleOpenStartDateModal={this.toggleOpenStartDateModal}
        onChangeStartDate={this.onChangeStartDate}
        isOpenEndDateModal={this.state.isOpenEndDateModal}
        toggleOpenEndDateModal={this.toggleOpenEndDateModal}
        onChangeEndDate={this.onChangeEndDate}
      />
    );
  }
};
