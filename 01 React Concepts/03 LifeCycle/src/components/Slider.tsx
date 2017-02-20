import * as React from 'react';

interface Props {
  id: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.StatelessComponent<Props> = (props) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="range">
        <input id={props.id} type="range" name="range" min="1" max="255" value={props.value || 0} onChange={props.onChange} />
        <output htmlFor={props.id}>{props.value}</output>
      </div>
    </div>
  </div>
);

export {
  Slider
};
