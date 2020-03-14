/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import './index.scss';
import { PageHeader, Tag, Button, message, Typography, Card } from 'antd';
import { getTimeGap } from 'utils';
import { update } from 'api/team';
import { RouteComponentProps } from 'react-router-dom';
import NoTeam from './components/NoTeam';
import TeamInfoFormModal from './components/TeamInfoFormModal';
import MemberList from './components/MemberList';

const { Paragraph } = Typography;

const TeamInfo: React.FC<RouteComponentProps> = () => {
  const { role, pkId } = useSelector((store: Store) => store.user);
  const { teamId, teamInfo } = useSelector((store: Store) => store.team);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  function onUpdate(value: any) {
    if (teamId) {
      update({ ...value, pkId: teamId }).then((res: any) => {
        if (res.code === 200) {
          setVisible(false);
          message.success(res.desc);
          dispatch({ type: 'SET_TEAM_INFO_SAGA', teamId });
        }
      });
    }
  }

  function onCancel() {
    setVisible(false);
  }

  if (!teamInfo) {
    return <NoTeam />;
  }
  return (
    <div>
      <div className="teamInfo-header-wrapper">
        <PageHeader
          className="teamInfo-header"
          title={teamInfo.name}
          tags={
          <Tag color="blue">{`已成立${getTimeGap(teamInfo.createTime)}天`}</Tag>
        }
          extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            disabled={role !== 1}
            ghost
          >
            修改信息
          </Button>,
          <Button key="2" danger>
            退出团队
          </Button>,
        ]}
        >
        <Paragraph>{teamInfo.description}</Paragraph>
        </PageHeader>
      </div>

      <div className="teamInfo-wrapper">
        <Card title="成员列表" style={{ padding: 0, marginTop: 24 }}>
          {teamId && pkId && (
            <MemberList
              teamId={teamId}
              myId={pkId}
              isTeamCreator={role === 1}
            />
          )}
        </Card>

        <TeamInfoFormModal
          title="修改团队信息"
          visible={visible}
          onOk={onUpdate}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default TeamInfo;
