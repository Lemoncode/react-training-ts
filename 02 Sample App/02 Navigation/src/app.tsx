import * as React from 'react';
const classNames: any = require('./appStyles');

// With this.props.children we are placing App children components
// where we want to render it.
export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={`container-fluid ${classNames.app}`}>
       {this.props.children}
      </div>
    );
  }
}
