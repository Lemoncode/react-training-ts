import * as React from 'react';
import {LoginCredentials} from '../../models/loginCredentials';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

interface Props {
  loginCredentials: LoginCredentials;
  updateLoginInfo: (fieldName: string, value: string) => void;
  loginRequest: (loginCredentials: LoginCredentials) => void;
}

export const LoginPage = (props: Props) => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <HeaderComponent />
          <FormComponent
            loginCredentials={props.loginCredentials}
            updateLoginInfo={props.updateLoginInfo}
            loginRequest={props.loginRequest}
          />
        </div>
      </div>
    </div>
  );
};
