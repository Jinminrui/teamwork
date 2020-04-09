import React, { useState, useEffect, useCallback } from 'react';
import { Card, List, Empty, Tag, Button } from 'antd';
import { getTaskList } from 'api/task';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { priorityColorMap, priorityDescMap, getStatusTagColor } from 'config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { setViewTaskProps } from 'store/task/task.action';
import StoryIcon from 'components/Icon/StoryIcon';
import { ProjectOutlined } from '@ant-design/icons';
import BugIcon from 'components/Icon/BugIcon';

const TodoList: React.FC<RouteComponentProps> = ({ history }) => {
  const [list, setList] = useState<Array<any>>([]);
  const [loading] = useState(false);
  const userId = useSelector((store: Store) => store.user.pkId);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    () => {
      if (userId) {
        getTaskList({ userId, executor: userId, stage: 'todo' }).then(res => {
          setList(res.data.slice(0, 6));
        });
      }
    },
    [userId],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Card
        title="待办事项"
        style={{ padding: 0, marginBottom: 24 }}
        loading={loading}
        extra={[
          <Button
            key={1}
            type="link"
            onClick={() => {
              history.push('/home/project-center');
            }}
          >
            查看更多
          </Button>,
        ]}
      >
        {list.length ? (
          <List
            dataSource={list}
            size="small"
            split={false}
            renderItem={(item, index) => (
              <div
                className="list-item"
                key={item.pkId}
                onClick={() => {
                  dispatch(
                    setViewTaskProps({
                      visible: true,
                      taskId: item.pkId,
                      refetch: fetchData,
                    })
                  );
                }}
              >
                <div className="detail">
                  <div className="name">
                    {item.title}
                  </div>
                  <div className="task-infos">
                    <Tag color={getStatusTagColor(item.stage)}>{item.stage}</Tag>
                    <span className="type">
                      {item.type === 1 ? <StoryIcon /> : <BugIcon />}
                      <span style={{ marginLeft: 6 }}>
                        {item.type === 1 ? '需求' : '缺陷'}
                      </span>
                    </span>
                    <span className="project">
                      <ProjectOutlined style={{ marginRight: 4 }} />
                    项目：{item.projectDetail.name}
                    </span>
                  </div>
                </div>
                <span className="task-priority">
                  <Tag color={priorityColorMap.get(item.priority)}>
                    {priorityDescMap.get(item.priority)}
                  </Tag>
                </span>
              </div>
            )}
          />
        ) : (
          <Empty description="暂无待办工作" />
        )}
      </Card>
    </div>
  );
};

export default withRouter(TodoList);
