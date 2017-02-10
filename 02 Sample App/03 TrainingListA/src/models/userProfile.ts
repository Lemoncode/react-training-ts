export class UserProfile {
  id: number;
  login: string;
  fullname: string;
  role: string;

  constructor() {
    this.id = 0;
    this.login = '';
    this.fullname = '';
    this.role = '';
  }
}
