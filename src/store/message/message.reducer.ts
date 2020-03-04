import { SET_TOTAL, SET_NOT_READ, SET_REVEIVED_MESSAGE_LIST } from './actionTypes';

export interface MessageState {
  total: number;
  notRead: number;
  list: Array<MessageItem>;
}

export interface MessageItem {
  pkId: string;
  type: number;
  senderId: string;
  receiverId: string;
  title: string;
  content: string;
  status: boolean;
  createTime: string;
  updateTime: string;
  senderRole: number;
  senderName: string;
}

const defaultState: MessageState = {
  total: 0,
  notRead: 0,
  list: [],
};

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total: action.data };
    case SET_NOT_READ:
      return { ...state, notRead: action.data };
    case SET_REVEIVED_MESSAGE_LIST:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
