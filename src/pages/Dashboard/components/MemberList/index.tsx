import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar } from 'antd';
import { getTeamMemberList } from 'api/team';
import { getCookies } from 'utils';

interface MemberItem {
  id: number;
  name: string;
  avatarUrl: string;
}

const MemberList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Array<MemberItem>>([]);
  const userToken = getCookies('user-token');
  useEffect(() => {
    setLoading(true);
    if (userToken) {
      getTeamMemberList(1).then(res => {
        setList(res.data.list);
        setLoading(false);
      });
    }

    return () => {};
  }, [userToken]);

  return (
    <Card
      title="成员"
      style={{ padding: 0 }}
      extra={<Link to="/team">全部成员</Link>}
      loading={loading}
    >
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
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Avatar src={item.avatarUrl} size={24} />
            <span
              style={{
                marginLeft: '12px',
                fontSize: '14px',
                lineHeight: '24px',
                verticalAlign: 'top',
              }}
            >
              {item.name}
            </span>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MemberList;
