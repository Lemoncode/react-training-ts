import * as React from 'react';
import * as toastr from 'toastr';
import {hashHistory} from 'react-router';
import {routeConstants} from '../../common/constants/routeConstants';
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

  // Other way to assign new object to loginCredentials to avoid mutation is:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  /*
    var newLoginCredentiasl = Object.assign({}, this.state.loginCredentials, {
      [fieldName]: value,
    });
  */
  // We are use a JavaScript proposal named object spread operator
  // https://github.com/sebmarkbage/ecmascript-rest-spread
  // http://stackoverflow.com/questions/32925460/spread-operator-vs-object-assign

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
        hashHistory.push(routeConstants.training.list);
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
