import * as React from 'react';
import {LoginCredentials} from '../../../models/loginCredentials';
import {InputComponent} from '../../../common/components/input';

interface Props {
  loginCredentials: LoginCredentials;
  updateLoginInfo: (fieldName: string, value: string) => void;
  loginRequest: (loginCredentials: LoginCredentials) => void;
}

export const FormComponent = (props: Props) => {
  const updateLoginInfo = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    props.updateLoginInfo(fieldName, value);
  };

  const loginRequest = (event) => {
    event.preventDefault();
    props.loginRequest(props.loginCredentials);
  }

  return (
    <div className="panel-body">
      <form role="form">
        <InputComponent
          label="Login"
          type="text"
          name="login"
          placeholder="Login"
          value={props.loginCredentials.login}
          onChange={updateLoginInfo.bind(this)}
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={props.loginCredentials.password}
          onChange={updateLoginInfo.bind(this)}
        />
        <button
          type="submit"
          className="btn btn-lg btn-success btn-block"
          onClick={loginRequest.bind(this)}
        >
          Login
        </button>
      </form>
    </div>
  );
};
