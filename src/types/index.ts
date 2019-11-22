import { UserState } from '../store/user/user.reducer';

export interface User {
  username: string;
}

export interface Store {
  user: UserState;
}
