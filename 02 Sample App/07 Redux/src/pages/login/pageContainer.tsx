import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../reducers';
import {LoginCredentials} from '../../models/loginCredentials';
import {UserProfile} from '../../models/userProfile';
import {loginContentChangedAction} from './actions/loginContentChanged';
import {loginRequestAction} from './actions/loginRequest';
import {LoginPage} from './page';

const mapStateToProps = (state: AppState) => ({
  loginCredentials: state.login.loginCredentials,
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginInfo: (fieldName: string, value: string) =>
    dispatch(loginContentChangedAction(fieldName, value)),
  loginRequest: (loginCredentials: LoginCredentials) =>
    dispatch(loginRequestAction(loginCredentials)),
});

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
