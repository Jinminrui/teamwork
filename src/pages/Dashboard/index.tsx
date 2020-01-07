import React from 'react';
import { IdcardOutlined } from '@ant-design/icons';
import { Avatar, Row, Col } from 'antd';
import './index.scss';

import { useSelector } from 'react-redux';
import { Store } from 'types';
import ProjectList from './components/ProjectList';
import ActivityList from './components/ActivityList';
import TodoList from './components/TodoList';
import MemberList from './components/MemberList';

const Dashbord: React.FC = () => {
  const userInfo = useSelector((store: Store) => store.user);
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="left-wrapper">
          <div className="avatar">
            <Avatar
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              size={72}
            />
          </div>

          <div className="text-wrapper">
            <div className="hello-title">
              早安，{userInfo.username}，祝你开心每一天！
            </div>
            <div className="desc">
              <IdcardOutlined style={{ marginRight: 8, fontSize: 20 }} />
              {userInfo.position}
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="state-item">
            <p className="title">加入时间</p>
            <p className="data">100</p>
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
