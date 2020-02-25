import { MessageState } from 'store/message/message.reducer';
import { Message } from 'types';
import {
  CONNECT_WEBSOCKET,
  DISCONNECT_WEBSOCKET,
  SEND_MESSAGE,
  SET_TOTAL,
  SET_NOT_READ,
  SET_REVEIVED_MESSAGE_LIST,
} from './actionTypes';

export const connectWebsocket = () => ({ type: CONNECT_WEBSOCKET });

export const disconnect = () => ({ type: DISCONNECT_WEBSOCKET });

export const sendMessage = (message: Message) => ({
  type: SEND_MESSAGE,
  data: message,
});

export const setTotal = (total: number) => ({
  type: SET_TOTAL,
  data: total,
});

export const setNotRead = (notRead: number) => ({
  type: SET_NOT_READ,
  data: notRead,
});

export const setReceivedMessageList = (messageState: MessageState) => ({
  type: SET_REVEIVED_MESSAGE_LIST,
  data: messageState,
});
