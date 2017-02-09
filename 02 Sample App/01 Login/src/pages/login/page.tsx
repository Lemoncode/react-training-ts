import * as React from 'react';
import {HeaderComponent} from './components/header';
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
            <HeaderComponent />
            <div>Form Component</div>
          </div>
        </div>
      </div>
    );
  }
};
