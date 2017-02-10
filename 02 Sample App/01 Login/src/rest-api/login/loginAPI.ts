import {LoginCredentials} from '../../models/loginCredentials';
import {UserProfile} from '../../models/userProfile';
import {userProfiles} from './loginMockData';

class LoginAPI {
  public login(loginCredentials: LoginCredentials): Promise<UserProfile> {
    let userProfile = userProfiles.find((userProfile) => {
      return userProfile.login === loginCredentials.login;
    });

    if (!userProfile || loginCredentials.password !== 'test') {
      return Promise.reject<UserProfile>('Invalid login or password');
    }

    return Promise.resolve(userProfile);
  }
}

export const loginAPI = new LoginAPI();
