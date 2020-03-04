import { get, post } from './request';

export interface DeleteMessageParams {
  receiverId: string;
  type: number;
}

export function getMessageListByReceiver(receiverId: string, pageSize: number, pageNum: number) {
  return get('/getMessageListByReceiver', { receiverId, pageSize, pageNum });
}

export function deleteMessage(params: DeleteMessageParams) {
  return post('/deleteMessage', params);
}

export function deleteOneMessage(id: string) {
  return post(`/deleteOneMessage/${id}`);
}

export function readOneMessage(messageId: string) {
  return post(`/readOneMessage/${messageId}`);
}
