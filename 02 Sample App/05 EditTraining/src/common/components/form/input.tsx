import * as React from 'react';

export interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
  className?: string;
  disabled?: boolean;
}

export const InputComponent = (props: InputProps) => {
  return (
    <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
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
    </div>
  );
}
