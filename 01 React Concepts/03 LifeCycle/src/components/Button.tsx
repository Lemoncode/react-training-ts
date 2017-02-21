import * as React from 'react';

interface Props {
  color: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.StatelessComponent<Props> = (props) => (
  <button
    type="button"
    onClick={props.onClick}
    className="btn btn-default white"
    style={{ backgroundColor: props.color }}>{props.children}</button>
);
