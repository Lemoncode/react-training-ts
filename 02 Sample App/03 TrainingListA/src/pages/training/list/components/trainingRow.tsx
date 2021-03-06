import * as React from 'react';
import {Training} from '../../../../models/training';

interface Props {
  training: Training;
}

export const TrainingRowComponent = (props: Props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={props.training.isActive}
          disabled
        />
      </td>
      <td>
        <span>{props.training.name}</span>
      </td>
      <td>
        <a href={props.training.url} target="_blank">{props.training.url}</a>
      </td>
      <td>
        <a className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
      </td>
    </tr>
  );
}
