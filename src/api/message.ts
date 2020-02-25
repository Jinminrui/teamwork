import { get } from './request';

export function getMessageListByReceiver(receiverId: string) {
  return get('/getMessageListByReceiver', { receiverId });
}
