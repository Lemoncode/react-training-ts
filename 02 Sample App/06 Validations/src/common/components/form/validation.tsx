import * as React from 'react';

interface Props {
  className?: string;
  error?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const ValidationComponent = (props: Props) => {
  let wrapperClass: string = `${props.className}`;

  if(props.error && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      {props.children}
      <div className="help-block">
        {props.error}
      </div>
    </div>
  );
}
