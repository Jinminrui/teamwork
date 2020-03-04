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
  const { team, role, pkId } = useSelector((store: Store) => store.user);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const teamId = team?.pkId;

  function onUpdate(value: any) {
    if (team?.pkId) {
      update({ ...value, pkId: team.pkId }).then((res: any) => {
        if (res.code === 200) {
          setVisible(false);
          message.success(res.desc);
          dispatch({ type: 'SET_USER_INFO_SAGA' });
        }
      });
    }
  }

  function onCancel() {
    setVisible(false);
  }

  if (!team) {
    return <NoTeam />;
  }
  return (
    <div className="teamInfo-wrapper">
      {!team && <NoTeam />}
      <PageHeader
        className="teamInfo-header"
        title={team.name}
        tags={
          <Tag color="blue">{`已成立${getTimeGap(team.createTime)}天`}</Tag>
        }
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            disabled={role !== 1}
          >
            修改信息
          </Button>,
          <Button key="2" danger>
            退出团队
          </Button>,
        ]}
      >
        <Paragraph>{team.description}</Paragraph>
      </PageHeader>
      <Card
        title="成员列表"
        style={{ padding: 0, marginTop: 24 }}
      >
        {teamId && pkId && (
          <MemberList teamId={teamId} myId={pkId} isTeamCreator={role === 1} />
        )}
      </Card>

      <TeamInfoFormModal
        title="修改团队信息"
        visible={visible}
        onOk={onUpdate}
        onCancel={onCancel}
      />
    </div>
  );
};

export default TeamInfo;
