import React, { useState, useEffect, useCallback } from 'react';
import './index.scss';
import { List, Tooltip, Avatar, Tag } from 'antd';
import { getTaskList } from 'api/task';
import StoryIcon from 'components/Icon/StoryIcon';
import { ProjectOutlined } from '@ant-design/icons';
import { setViewTaskProps } from 'store/task/task.action';
import { useDispatch } from 'react-redux';
import { priorityColorMap, priorityDescMap, getStatusTagColor } from 'config';
import BugIcon from 'components/Icon/BugIcon';

interface Props {
  type: string;
}

const TaskList = (props: Props) => {
  const { type } = props;
  const [list, setList] = useState<Array<any>>([]);

  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    if (userId) {
      if (type === 'myexe') {
        getTaskList({ userId, executor: userId }).then(res => {
          setList(res.data);
        });
      }
      if (type === 'mycreate') {
        getTaskList({ userId, creatorId: userId }).then(res => {
          setList(res.data);
        });
      }
    }
  }, [userId, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTitle = () => {
    if (type === 'myexe') {
      return '我执行的';
    }
    if (type === 'mycreate') {
      return '我创建的';
    }
    if (type === 'myjoin') {
      return '我参与的';
    }
  };

  return (
    <div className="task-list-container">
      <div className="header-bar">
        <div className="title">{getTitle()} · {list.length}</div>
      </div>
      <div className="task-list">
        <List
          dataSource={list}
          renderItem={(item: any) => (
            <div
              className="list-item"
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
                  <span className="task-priority">
                    <Tag color={priorityColorMap.get(item.priority)}>
                      {priorityDescMap.get(item.priority)}
                    </Tag>
                  </span>
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
              <div className="executor">
                {item.executorInfo && (
                  <Tooltip title={item.executorInfo.username}>
                    <Avatar size={24} src={item.executorInfo.avatar} />
                  </Tooltip>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TaskList;
