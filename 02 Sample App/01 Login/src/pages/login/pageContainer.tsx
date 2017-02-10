import * as React from 'react';
import * as toastr from 'toastr';
import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredentials} from '../../models/loginCredentials';
import {UserProfile} from '../../models/userProfile';
import {LoginPage} from './page';

interface State {
  loginCredentials: LoginCredentials;
}

export class LoginPageContainer extends React.Component <{}, State> {
  constructor() {
    super();

    this.state = {
      loginCredentials: new LoginCredentials(),
    };
  }

  private updateLoginInfo(fieldName: string, value: string) {
    this.setState({
      loginCredentials: {
        ...this.state.loginCredentials,
        [fieldName]: value,
      }
    });
  }

  private loginRequest(loginCredentials: LoginCredentials) {
    toastr.remove();
    loginAPI.login(loginCredentials)
      .then((userProfile: UserProfile) => {
        toastr.success(`Success login ${userProfile.fullname}`);
      })
      .catch((error) => {
        toastr.error(error);
      });
  }

  public render() {
    return (
      <LoginPage
        loginCredentials={this.state.loginCredentials}
        updateLoginInfo={this.updateLoginInfo.bind(this)}
        loginRequest={this.loginRequest.bind(this)}
      />
    );
  }
}
