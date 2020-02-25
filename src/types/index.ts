import { MessageState } from 'store/message/message.reducer';
import { TeamState } from 'store/team/team.reducer';
import { AppState } from 'store/app/app.reducer';
import { UserState } from 'store/user/user.reducer';

export interface Store {
  user: UserState;
  app: AppState;
  team: TeamState;
  message: MessageState;
}

export interface ProjectListItem {
  id: number;
  title: string;
  description: string;
  createTime: string;
  updateTime: string;
}

export enum MessageType {
  NOTICE = 1,
  INVITE,
}

export interface Receiver {
  id: string;
  username: string;
}

export interface Message {
  receivers: Array<Receiver>;
  title: string;
  content: string;
  type: MessageType;
}
