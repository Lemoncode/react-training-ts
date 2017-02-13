import * as React from 'react';
import * as Modal from 'react-modal';
const classNames: any = require('./datePickerModalStyles');

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DatePickerModalComponent = (props: Props) => {
  return (
    <Modal
    isOpen={props.isOpen}
    contentLabel="Date Picker Modal"
    onRequestClose={props.onClose}
    className={`modal-dialog modal-open`}
    overlayClassName={classNames.overlay}
    >
      <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
    </Modal>
  );
};
