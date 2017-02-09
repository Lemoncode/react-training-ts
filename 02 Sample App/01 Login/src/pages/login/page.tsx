import * as React from 'react';
import {LoginCredential} from '../../models/loginCredential';

interface State {
  loginCredential: LoginCredential;
}

export class LoginPage extends React.Component <{}, State> {  
  public render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div>Header Component</div>
            <div>Form Component</div>
          </div>
        </div>
      </div>
    );
  }
};
