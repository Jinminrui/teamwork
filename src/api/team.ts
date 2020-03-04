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

interface DeleteParams {
  teamId: string;
  userId: string;
}

interface InviteParams {
  teamId: string;
  phones: Array<string>;
}

export function create(params: CreateParams) {
  return post('/team/create', params);
}

export function update(params: UpdateParams) {
  return post('/team/update', params);
}

export function deleteMember(params: DeleteParams) {
  return post('/team/deleteMember', params);
}

export function inviteMember(params: InviteParams) {
  return post('/team/inviteMember', params);
}

export function sureToJoinTeam(phone: string) {
  return post(`/team/sureToJoin/${phone}`);
}
