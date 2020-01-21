import { get, post } from './request';

export function getTeamMemberList(teamId: number) {
  return get(`/team/memberList/${teamId}`);
}

interface CreateParams {
  name: string;
  description: string;
  creatorId: string;
}

interface UpdateParams {
  pkId: string;
  name: string;
  description: string;
}

export function create(params: CreateParams) {
  return post('/team/create', params);
}

export function update(params: UpdateParams) {
  return post('/team/update', params);
}
