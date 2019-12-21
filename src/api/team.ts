import { get } from './request';

export function getTeamMemberList(teamId: number) {
  return get(`/team/memberList/${teamId}`);
}
