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

interface GetTeamInfoParams {
  teamId: string;
  userId: string;
}

export function getTeamInfo(params: GetTeamInfoParams) {
  return get('/user-center/team/detail', params);
}

export function create(params: CreateParams) {
  return post('/user-center/team/create', params);
}

export function update(params: UpdateParams) {
  return post('/user-center/team/update', params);
}

export function deleteMember(params: DeleteParams) {
  return post('/user-center/team/deleteMember', params);
}

export function inviteMember(params: InviteParams) {
  return post('/user-center/team/inviteMember', params);
}

export function sureToJoinTeam(phone: string) {
  return post(`/user-center/team/sureToJoin/${phone}`);
}
