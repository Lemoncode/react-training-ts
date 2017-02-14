import * as React from 'react';
import {AutoSizer} from 'react-virtualized';
const ReactCalendar: any = require('react-infinite-calendar');
const InfiniteCalendar = ReactCalendar.default;
const classNames: any = require('./datePickerStyles');

interface Props {
  onClose: () => void;
  selectedDate: Date;
  onChange: (selectedDate: Date) => void;
}

export const DatePickerComponent = (props: Props) => {
  return (
    <AutoSizer>
    {
      ({width, height}) =>
      <div>
        <button
          type="button"
          className={`close ${classNames.closeButton}`}
          onClick={props.onClose}
        >
          <span>&times;</span>
        </button>
        <InfiniteCalendar
          width={width}
          height={height}
          selectedDate={props.selectedDate}
          afterSelect={props.onChange}
        />
      </div>
    }
    </AutoSizer>
  );
};
