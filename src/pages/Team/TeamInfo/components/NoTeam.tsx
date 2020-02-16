import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { Result, Button, message } from 'antd';
import { create } from 'api/team';
import NoTeamSvg from './no-team.svg';
import TeamInfoFormModal from './TeamInfoFormModal';

export interface Values {
  name: string;
  description: string;
  creatorId: string;
}

const NoTeam = () => {
  const { username, pkId } = useSelector((store: Store) => store.user);
  const [visible, setVisible] = useState(false);
  function showCreateTeamModal() {
    setVisible(true);
  }

  function onCreate(values: Values) {
    if (pkId) {
      const newValues: Values = { ...values, creatorId: pkId };
      create(newValues).then((res: any) => {
        if (res.code === 200) {
          message.success('创建成功');
          window.location.reload();
        }
      });
    }
    setVisible(false);
  }

  function onCancel() {
    setVisible(false);
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        status="info"
        title="尚未加入团队"
        subTitle="对不起，您还没有加入团队，您可以联系朋友邀请您或者创建一个。"
        icon={<img src={NoTeamSvg} alt="" width="200" height="200" />}
        extra={
          <Button type="primary" onClick={showCreateTeamModal}>
            创建团队
          </Button>
        }
      />
      {username && (
        <TeamInfoFormModal
          title="创建团队"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default NoTeam;
