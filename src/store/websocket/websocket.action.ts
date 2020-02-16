import { Message } from 'types';
import {
  CONNECT_WEBSOCKET,
  DISCONNECT_WEBSOCKET,
  SEND_MESSAGE,
} from './actionTypes';

export const connectWebsocket = () => ({ type: CONNECT_WEBSOCKET });

export const disconnect = () => ({ type: DISCONNECT_WEBSOCKET });

export const sendMessage = (message: Message) => ({
  type: SEND_MESSAGE,
  data: message,
});
