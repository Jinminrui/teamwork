import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';

interface MemberItem {
  id: number;
  name: string;
  avatarUrl: string;
}

const MemberList = () => {
  const { memberList } = useSelector((store: Store) => store.team);
  return (
    <Card
      title="成员"
      style={{ padding: 0 }}
      extra={<Link to="/team">全部成员</Link>}
    >
      {memberList.length === 0 ? (
        <Empty description="快去邀请你的团队成员吧！" />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 1,
            xxl: 2,
          }}
          dataSource={memberList}
          renderItem={item => (
            <List.Item key={item.id}>
              <Avatar src={item.avatar} size={24} />
              <span
                style={{
                  marginLeft: '12px',
                  fontSize: '14px',
                  lineHeight: '24px',
                  verticalAlign: 'top',
                }}
              >
                {item.username}
              </span>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default MemberList;
