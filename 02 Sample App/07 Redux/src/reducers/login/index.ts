import {LoginCredentials} from '../../models/loginCredentials';
import {loginActionConstants} from '../../common/constants/actionConstants/loginActionConstants';
import {LoginContentChangedPayload} from '../../pages/login/actions/loginContentChanged';

export class LoginState {
  public loginCredentials: LoginCredentials;

  constructor() {
    this.loginCredentials = new LoginCredentials();
  }
}

export const loginReducer = (state: LoginState = new LoginState(), action) => {
  switch (action.type) {
    case loginActionConstants.LOGIN_CONTENT_CHANGED:
      return handleLoginContentChanged(state, action.payload);

    default:
      return state;
  }
};

const handleLoginContentChanged = (state: LoginState, payload: LoginContentChangedPayload) => ({
  ...state,
  loginCredentials: {
    ...state.loginCredentials,
    [payload.fieldName]: payload.value,
  },
});
