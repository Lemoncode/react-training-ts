import * as React from 'react';
import {LoginCredential} from '../../models/loginCredential';
import {HeaderComponent} from './components/header';
import {FormComponent} from './components/form';

interface Props {
  loginCredential: LoginCredential;
  updateLoginInfo: (fieldName: string, value: string) => void;
  loginRequest: (loginCredential: LoginCredential) => void;
}

export const LoginPage = (props: Props) => {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <HeaderComponent />
          <FormComponent
            loginCredential={props.loginCredential}
            updateLoginInfo={props.updateLoginInfo}
            loginRequest={props.loginRequest}
          />
        </div>
      </div>
    </div>
  );
};
