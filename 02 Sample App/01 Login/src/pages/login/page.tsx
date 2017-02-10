import * as React from 'react';
import * as toastr from 'toastr';
import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredential} from '../../models/loginCredential';
import {LoginResponse} from '../../models/loginResponse';
import {HeaderComponent} from './components/header';
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

  private loginRequest(loginCredential: LoginCredential) {
    loginAPI.login(loginCredential)
      .then((loginResponse: LoginResponse) => {
        toastr.success(`Success login ${loginResponse.userProfile.fullname}`);
      })
      .catch((error) => {
        toastr.error(error);
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
              loginRequest={this.loginRequest.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};
