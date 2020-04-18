import React, { useState, useEffect } from 'react';
import { Card, Avatar, List } from 'antd';
import { getActivityList } from 'api/activity';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import moment from 'moment';

const ActivityList: React.FC = () => {
  const [list, setList] = useState<Array<number>>([]);
  const [loading, setLoading] = useState(false);
  const { teamId } = useSelector((store: Store) => store.team);
  useEffect(() => {
    if (teamId) {
      setLoading(true);
      getActivityList({ teamId }).then(res => {
        setList(res.data);
        setLoading(false);
      });
    }
  }, [teamId]);

  return (
    <Card
      title="最新动态"
      style={{ padding: 0, marginBottom: 24 }}
      loading={loading}
    >
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.creatorDetail.avatar}
                  size={32}
                />
              }
              title={item.title}
              description={moment(item.createTime).fromNow()}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ActivityList;
