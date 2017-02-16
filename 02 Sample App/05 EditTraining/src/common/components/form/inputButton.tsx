import * as React from 'react';
import {InputProps} from './input';

interface Props extends InputProps {
  onClick: () => void;
  buttonClassName: string;
  icon: string;
}

export const InputButtonComponent = (props: Props) => {
  return (
    <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <div className="input-group">
        <input
          id={props.name}
          type={props.type}
          className="form-control"
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        <div className="input-group-btn">
          <span className={props.buttonClassName} onClick={props.onClick}>
            <i className={props.icon} />
          </span>
        </div>
      </div>
    </div>
  );
};
