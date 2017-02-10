import {LoginCredential} from '../../models/loginCredential';
import {UserProfile} from '../../models/userProfile';
import {userProfiles} from './loginMockData';

class LoginAPI {
  public login(loginCredential: LoginCredential): Promise<UserProfile> {
    let userProfile = userProfiles.find((userProfile) => {
      return userProfile.login === loginCredential.login;
    });

    if (!userProfile || loginCredential.password !== 'test') {
      return Promise.reject<UserProfile>('Invalid login or password');
    }

    return Promise.resolve(userProfile);
  }
}

export const loginAPI = new LoginAPI();
