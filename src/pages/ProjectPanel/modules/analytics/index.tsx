import React from 'react';
import './index.scss';
import { Row, Col } from 'antd';
import TaskAnalyticGraph from './components/TaskAnalyticGraph';
import FinishedTaskAnalyticGraph from './components/FinishedTaskAnalyticGraph';
import BugTrend from './components/BugTrend';
import BurnupGraph from './components/BurnupGraph';

const Analytics = () => (
  <div className="analytics-container">
    <div className="analytics-wrapper">
      <div className="analytics-content">
        <div className="analytics-content-header">
          <div className="title">项目统计</div>
        </div>
        <div className="graph-cards">
          <Row gutter={24}>
            <Col span={24}>
              <TaskAnalyticGraph />
            </Col>
            <Col span={24}>
              <FinishedTaskAnalyticGraph />
            </Col>
            <Col span={24}>
              <BugTrend />
            </Col>
            <Col span={24}>
              <BurnupGraph />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;
