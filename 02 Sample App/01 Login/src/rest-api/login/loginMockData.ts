import {LoginResponse} from '../../models/loginResponse';

export const loginMockResponses: LoginResponse[] = [
  {
    succeeded: true,
    userProfile: { id: 1, login: 'admin', fullname: 'Admin', role: 'admin', },
  },
];
