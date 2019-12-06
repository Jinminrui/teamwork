import React, { useState, useEffect } from 'react';
import { Card, Avatar, List } from 'antd';

const ActivityList: React.FC = () => {
  const [list, setList] = useState<Array<number>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setList([1, 2, 3, 4, 5, 6]);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Card
      title="最新动态"
      style={{ padding: 0, marginBottom: 24 }}
      loading={loading}
    >
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  size={32}
                />
              }
              title={<a href="/">金敏睿 在 高逼格设计天团 新建项目 六月迭代</a>}
              description="1小时前"
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ActivityList;
