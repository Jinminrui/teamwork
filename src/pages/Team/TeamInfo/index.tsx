/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import './index.scss';
import {
  PageHeader,
  Tag,
  Button,
  message,
  Typography,
  List,
  Avatar,
  Card,
  Popconfirm,
} from 'antd';
import { getTimeGap } from 'utils';
import { update, deleteMember } from 'api/team';
import { getAllUsersByTeam } from 'api/user';
import { UserState } from 'store/user/user.reducer';
import { PhoneOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import NoTeam from './components/NoTeam';
import TeamInfoFormModal from './components/TeamInfoFormModal';

const { Paragraph } = Typography;

const TeamInfo: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { team, role, pkId } = useSelector((store: Store) => store.user);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<Array<UserState>>([]);

  const teamId = team?.pkId;

  useEffect(() => {
    if (teamId) {
      getAllUsersByTeam(teamId).then((res: any) => {
        if (res.code === 200) {
          setList(res.data);
        }
      });
    }
  }, [teamId]);

  function onUpdate(value: any) {
    if (team?.pkId) {
      update({ ...value, pkId: team.pkId }).then((res: any) => {
        if (res.code === 200) {
          setVisible(false);
          message.success(res.desc);
          window.location.reload();
        }
      });
    }
  }

  function onCancel() {
    setVisible(false);
  }

  function handleDeleteMember(item: UserState) {
    if (teamId && item.pkId) {
      deleteMember({ teamId, userId: item.pkId }).then((res: any) => {
        message.success(res.desc);
        window.location.reload();
      });
    }
  }

  if (!team) {
    return <NoTeam />;
  }
  return (
    <div className="teamInfo-wrapper">
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
          <Button key="2" type="danger">
            退出团队
          </Button>,
        ]}
      >
        <Paragraph>{team.description}</Paragraph>
      </PageHeader>
      <Card
        title="成员列表"
        style={{ padding: 0, marginTop: 24 }}
        extra={role === 1 && [<Button type="primary">邀请成员</Button>]}
      >
        <List
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={
                role === 1 && item.pkId !== pkId
                  ? [
                      <Popconfirm
                        title="您确定要移除该成员吗？"
                        onConfirm={() => {
                          handleDeleteMember(item);
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type="danger" size="small">
                          移除
                        </Button>
                      </Popconfirm>,
                    ]
                  : undefined
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size={64} />}
                title={
                  <div style={{ display: 'inline-block' }}>
                    <span style={{ fontSize: 18, marginRight: 12 }}>
                      {item.username || item.phone || ''}
                    </span>
                    {item.position && <Tag color="green">{item.position}</Tag>}
                  </div>
                }
                description={
                  <div>
                    <PhoneOutlined />
                    <span style={{ marginLeft: 10 }}>{item.phone}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <TeamInfoFormModal
        title="修改团队信息"
        initialValues={{
          name: team.name,
          description: team.description,
        }}
        visible={visible}
        onOk={onUpdate}
        onCancel={onCancel}
      />
    </div>
  );
};

export default TeamInfo;
