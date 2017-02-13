import * as React from 'react';
import {Link} from 'react-router';
import {Training} from '../../../../models/training';
import {TableRowProps, TableRowComponent} from '../../../../common/components/tableRow';
const classNames: any = require('./trainingRowStyles');
import {routeConstants} from '../../../../common/constants/routeConstants';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
interface Props extends TableRowProps {
  rowData: Training;
}

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props: Props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
      // We have enable camelCase parser in webpack.config.js
      className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
      <Link
        to={`${routeConstants.training.edit}/${props.rowData.id}`}
        className=" btn btn-primary"
      >
        <i className="glyphicon glyphicon-pencil" />
      </Link>
    </TableRowComponent>
  );
}
