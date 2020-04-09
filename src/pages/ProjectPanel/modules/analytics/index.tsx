import React from 'react';
import './index.scss';
import { Row, Col } from 'antd';
import TaskAnalyticGraph from './components/TaskAnalyticGraph';
import FinishedTaskAnalyticGraph from './components/FinishedTaskAnalyticGraph';

const Analytics = () => (
  <div className="analytics-container">
    <div className="analytics-wrapper">
      <div className="analytics-content">
        <div className="analytics-content-header">
          <div className="title">项目统计</div>
        </div>
        <div className="graph-cards">
          <Row gutter={24}>
            <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <TaskAnalyticGraph />
            </Col>
            <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
              <FinishedTaskAnalyticGraph />
            </Col>
            <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                3
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;
