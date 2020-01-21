import React from 'react';
import { IdcardOutlined } from '@ant-design/icons';
import { Avatar, Row, Col } from 'antd';
import './index.scss';

import { useSelector } from 'react-redux';
import { Store } from 'types';
import { getTimeGap } from 'utils';
import ProjectList from './components/ProjectList';
import ActivityList from './components/ActivityList';
import TodoList from './components/TodoList';
import MemberList from './components/MemberList';

const Dashbord: React.FC = () => {
  const userInfo = useSelector((store: Store) => store.user);

  function getGreetingByTime(username: string | undefined) {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour <= 11) {
      return `早上好，${username}！`;
    }
    if (hour > 11 && hour <= 14) {
      return `中午好，${username}！`;
    }
    if (hour > 14 && hour < 18) {
      return `下午好，${username}！`;
    }
    return `晚上好，${username}！`;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="left-wrapper">
          <div className="avatar">
            <Avatar src={userInfo.avatar} size={72} />
          </div>

          <div className="text-wrapper">
            <div className="hello-title">
              {getGreetingByTime(userInfo.username || userInfo.phone || '')}
            </div>
            <div className="desc">
              <IdcardOutlined style={{ marginRight: 8, fontSize: 20 }} />
              {userInfo.position}
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="state-item">
            <p className="title">加入时间（天）</p>
            <p className="data">
              {userInfo.createTime ? getTimeGap(userInfo.createTime) : 0}
            </p>
          </div>
          <div className="state-item">
            <p className="title">项目数</p>
            <p className="data">32</p>
          </div>
          <div className="state-item">
            <p className="title">团队排名</p>
            <p className="data">
              8
              <span
                style={{
                  color: 'rgba(0, 0, 0, 0.45)',
                  fontSize: '24px',
                  fontWeight: 300,
                  padding: '0 2px',
                }}
              >
                / 24
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="content-main">
          <Row gutter={24}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={16}
              style={{ padding: '0 12px' }}
            >
              <ProjectList />
              <ActivityList />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={8}
              style={{ padding: '0 12px' }}
            >
              <TodoList />
              <MemberList />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
