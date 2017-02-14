import * as React from 'react';
import {InputComponent, InputProps} from './input';
const classNames: any = require('./inputButtonStyles');

interface Props extends InputProps {
  onClick: () => void;
  buttonClassName: string;
  icon: string;
}

export const InputButtonComponent = (props: Props) => {
  return (
    <InputComponent
      {
        ...props
      }
      className={`${props.className} input-group ${classNames.inputComponent}`}
    >
      <div className={`input-group-btn ${classNames.button}`}>
        <span className={props.buttonClassName} onClick={props.onClick}>
          <i className={props.icon} />
        </span>
      </div>
    </InputComponent>
  );
};
