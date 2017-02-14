import * as React from 'react';
import * as Modal from 'react-modal';
import {Moment} from 'moment';
import {DatePickerComponent} from './components/datePicker';
const classNames: any = require('./datePickerModalStyles');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: number;
  onChange: (selectedDate: Moment) => void;
}

export const DatePickerModalComponent = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
      <DatePickerComponent
        onClose={props.onClose}
        selectedDate={props.selectedDate}
        onChange={props.onChange}
      />
    </Modal>
  );
};
