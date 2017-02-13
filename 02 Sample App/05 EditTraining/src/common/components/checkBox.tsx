import * as React from 'react';

interface Props {
  label: string;
  name: string;
  value: boolean;
  onChange: any;
  className?: string;
}

export const CheckBoxComponent = (props: Props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <label htmlFor={props.name}>
        <input
          type="checkbox"
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
        />
        {props.label}
      </label>
    </div>
  );
}
