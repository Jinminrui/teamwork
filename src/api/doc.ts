import { post, get } from './request';

export interface AddDocParams {
  title: string;
  content: string;
  type: string;
  authorId: string;
  projectId: string;
  teamId: string;
}

export interface GetDocListParams {
  authorIds: Array<string>;
  types: Array<string>;
  teamId: string;
  projectId?: string;
  pageSize: number;
  pageNum: number;
}

export interface UpdateDocParams {
  pkId: string;
  content: string;
}

export function addDoc(params: AddDocParams) {
  return post('/docs-center/doc/add', params);
}

export function getDocList(params: GetDocListParams) {
  return post('/docs-center/doc/list', params);
}


export function getDetail(id: string) {
  return get(`/docs-center/doc/${id}`);
}

export function deleteDoc(id: string) {
  return post(`/docs-center/doc/delete/${id}`);
}


export function update(params: UpdateDocParams) {
  return post('/docs-center/doc/update', params);
}
