import * as React from 'react';
import * as toastr from 'toastr';
import {loginAPI} from '../../rest-api/login/loginAPI';
import {LoginCredential} from '../../models/loginCredential';
import {UserProfile} from '../../models/userProfile';
import {LoginPage} from './page';

interface State {
  loginCredential: LoginCredential;
}

export class LoginPageContainer extends React.Component <{}, State> {
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
    toastr.remove();
    loginAPI.login(loginCredential)
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
        loginCredential={this.state.loginCredential}
        updateLoginInfo={this.updateLoginInfo.bind(this)}
        loginRequest={this.loginRequest.bind(this)}
      />
    );
  }
}
