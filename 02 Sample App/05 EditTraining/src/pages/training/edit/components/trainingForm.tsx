import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
import {InputComponent} from '../../../../common/components/input';
import {CheckBoxComponent} from '../../../../common/components/checkBox';
import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
const classNames: any = require('./trainingFormStyles');

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

interface State {
  isOpenStartDateModal: boolean;
  isOpenEndDateModal: boolean;
}

export class TrainingFormComponent extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isOpenStartDateModal: false,
      isOpenEndDateModal: false,
    };
  }

  private onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.props.onChange(fieldName, value);
  }

  private toggleOpenModal(fieldName) {
    this.setState({
      [fieldName]: !this.state[fieldName]
    });
  }

  private onChangeStartDate(momentDate: moment.Moment) {
    const milliseconds = momentDate.valueOf();
    this.props.onChange('startDate', milliseconds);
  }

  public render() {
    return (
      <form className="container">
        <InputComponent
          className="col-md-6"
          type="text"
          label="Name"
          name="name"
          onChange={this.onChange.bind(this)}
          value={this.props.training.name}
          placeholder="Name"
        />

        <InputComponent
          className="col-md-6"
          type="text"
          label="Url"
          name="url"
          onChange={this.onChange.bind(this)}
          value={this.props.training.url}
          placeholder="Url"
        />

        <InputComponent
          className={`col-md-6 input-group ${classNames.dateInputGroup}`}
          type="text"
          label="Start date"
          name="startDate"
          onChange={this.onChange.bind(this)}
          placeholder="Start date"
          value={moment(this.props.training.startDate).format('YYYY-MM-D')}
          >
            <div className="input-group-btn">
              <span className="btn btn-default" onClick={() => this.toggleOpenModal('isOpenStartDateModal')}>
                <i className="glyphicon glyphicon-calendar" />
              </span>
            </div>
          </InputComponent>

        <DatePickerModalComponent
          isOpen={this.state.isOpenStartDateModal}
          onClose={() => this.toggleOpenModal('isOpenStartDateModal')}
          selectedDate={this.props.training.startDate}
          onChange={this.onChangeStartDate.bind(this)}
        />

        <InputComponent
          className={`col-md-6 input-group ${classNames.dateInputGroup}`}
          type="text"
          label="End date"
          name="endDate"
          onChange={this.onChange.bind(this)}
          value={moment(this.props.training.endDate).format('YYYY-MM-D')}
          placeholder="End date"
        >
          <div className="input-group-btn">
            <button className="btn btn-default"><i className="glyphicon glyphicon-calendar" /></button>
          </div>
        </InputComponent>

        <CheckBoxComponent
          className="col-md-6"
          label="Active"
          name="isActive"
          onChange={this.onChange.bind(this)}
          value={this.props.training.isActive}
        />
      </form>
    );
  }
};
