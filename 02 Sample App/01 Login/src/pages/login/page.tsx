import * as React from 'react';
import {HeaderComponent} from './components/header';
import {LoginCredential} from '../../models/loginCredential';
import {FormComponent} from './components/form';

interface State {
  loginCredential: LoginCredential;
}

export class LoginPage extends React.Component <{}, State> {
  constructor() {
    super();
    
    this.state = {
      loginCredential: new LoginCredential(),
    };
  }

  private updateLoginInfo(fieldName: string, value: string) {
    this.setState({
      loginCredential: {
        ...this.state.loginCredential,
        [fieldName]: value,
      }
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <HeaderComponent />
            <FormComponent
              loginCredential={this.state.loginCredential}
              updateLoginInfo={this.updateLoginInfo.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};
