import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar, Empty } from 'antd';

interface MemberItem {
  id: number;
  name: string;
  avatarUrl: string;
}

const MemberList = () => {
  // const [loading, setLoading] = useState(false);
  const [list] = useState<Array<MemberItem>>([]);
  // const userToken = getCookies('user-token');
  // useEffect(() => {
  //   setLoading(true);
  //   if (userToken) {
  //     getTeamMemberList(1).then(res => {
  //       if (res.data) {
  //         setList(res.data.list);
  //         setLoading(false);
  //       }
  //     });
  //   }

  //   return () => {};
  // }, [userToken]);

  return (
    <Card
      title="成员"
      style={{ padding: 0 }}
      extra={<Link to="/team">全部成员</Link>}
    >
      {list.length === 0 ? (
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
      )}
    </Card>
  );
};

export default MemberList;
