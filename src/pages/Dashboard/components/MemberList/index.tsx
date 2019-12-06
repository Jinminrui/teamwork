import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Avatar } from 'antd';

const MemberList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Array<string>>([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setList(['金敏睿', '杨志云', '罗飞']);
      setLoading(false);
    }, 3000);
  }, []);
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
          xl: 2,
          xxl: 2,
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Avatar
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              size={24}
            />
            <span
              style={{
                marginLeft: '12px',
                fontSize: '14px',
                lineHeight: '24px',
                verticalAlign: 'top',
              }}
            >
              {item}
            </span>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MemberList;
