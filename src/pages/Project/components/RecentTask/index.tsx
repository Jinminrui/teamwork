import React, { useState } from 'react';
import { FileDoneOutlined } from '@ant-design/icons';
import { Empty, List } from 'antd';
import './index.scss';

const RecentTask = () => {
  const [recentTasks] = useState([
    '项目中心功能设计',
    '项目中心功能设计',
    '项目中心功能设计',
    '项目中心功能设计',
    '项目中心功能设计',
    '项目中心功能设计',
  ]);
  return (
    <div className="recent-tasks">
      <div className="title">最近浏览的任务</div>
      <div className="recent-task-list">
        <List
          dataSource={recentTasks}
          renderItem={item => (
            <List.Item className="task-item">
              <FileDoneOutlined className="icon" />
              <div className="task-content">
                <div className="task-name">{item}</div>
                <div className="task-date">今天 16:30 查看过</div>
              </div>
            </List.Item>
          )}
          locale={{
            emptyText: <Empty description="暂无浏览任务" />,
          }}
        />
      </div>
    </div>
  );
};

export default RecentTask;
