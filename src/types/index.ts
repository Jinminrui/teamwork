import { AppState } from '../store/app/app.reducer';
import { UserState } from '../store/user/user.reducer';

export interface Store {
  user: UserState;
  app: AppState;
}
