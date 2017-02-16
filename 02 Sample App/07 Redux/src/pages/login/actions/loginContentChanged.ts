import {LoginCredentials} from '../../../models/loginCredentials';
import {loginActionConstants} from '../../../common/constants/actionConstants';

export interface LoginContentChangedPayload {
  fieldName: string;
  value: string;
}

export const loginContentChangedAction = (fieldName: string, value: string) => ({
  type: loginActionConstants.LOGIN_CONTENT_CHANGED,
  payload: {
    fieldName,
    value
  } as LoginContentChangedPayload,
});
