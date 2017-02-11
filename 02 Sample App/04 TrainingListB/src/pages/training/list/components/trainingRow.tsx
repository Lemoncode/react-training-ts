import * as React from 'react';
import {Training} from '../../../../models/training';
const classNames: any = require('./trainingRowStyles');

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
interface Props {
  rowData: Training;
  className: string;
  style: React.CSSProperties;
  columns: any[];
  index: number;
  key: any;
  isScrolling: boolean;
  onRowClick?: () => void;
  onRowDoubleClick?: () => void;
  onRowMouseOver?: () => void;
  onRowMouseOut?: () => void;
}

export const TrainingRowComponent = (props: Props) => {
  return (
    <div className={`${props.className} ${classNames.rowStriped}`} key={props.key} style={props.style}>
      <div
        className={props.columns[0].props.className}
        style={props.columns[0].props.style}
      >
        <input
          type="checkbox"
          checked={props.rowData.isActive}
          disabled
        />
      </div>
      <div
        className={props.columns[1].props.className}
        style={props.columns[1].props.style}
      >
        <span>{props.rowData.name}</span>
      </div>
      <div
        className={props.columns[2].props.className}
        style={props.columns[2].props.style}
      >
      <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
      </div>
      <div
        className={`${props.columns[3].props.className}`}
        style={props.columns[3].props.style}
      >
        <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
      </div>
    </div>
  );
}
