import * as React from 'react';
import * as Modal from 'react-modal';
import {DatePickerComponent} from './components/datePicker';
const classNames: any = require('./datePickerModalStyles');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onChange: (selectedDate: Date) => void;
}

export const DatePickerModalComponent = (props: Props) => {
  return (
    <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onClose.bind(this)}
    className={`${classNames.modal} modal-dialog modal-open`}
    overlayClassName={classNames.overlay}
    contentLabel="Date Picker Modal"
    >
      <DatePickerComponent
        onClose={props.onClose.bind(this)}
        selectedDate={props.selectedDate}
        onChange={props.onChange.bind(this)}
      />
    </Modal>
  );
};
