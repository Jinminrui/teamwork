import React, { useState } from 'react';
import { Row, Col, Card, Avatar, Icon, Divider, List } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';

const PersonalInfo: React.FC = () => {
  const [tabKey, setTabKey] = useState('article');
  const userInfo = useSelector((store: Store) => store.user);
  const tabList = [
    {
      key: 'article',
      tab: '文章',
    },
    {
      key: 'project',
      tab: '项目',
    },
  ];

  function handleTabChange(key: string) {
    setTabKey(key);
  }
  return (
    <div className="personalInfo-wrapper">
      <Row gutter={24}>
        <Col md={24} lg={7} style={{ padding: '0 12px' }}>
          <Card>
            <div className="personalInfo-avatar-wrapper">
              <Avatar
                src={userInfo.avatarUrl}
                size={104}
                className="avatar-img"
              />
              <div className="username">{userInfo.username}</div>
              <div className="desc">{userInfo.description}</div>
            </div>
            <div className="personalInfo-detail-wrapper">
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                }}
              >
                <List.Item className="detail-item">
                  <p>
                    <Icon
                      type="idcard"
                      style={{ marginRight: 12, fontSize: 14 }}
                    />
                    {userInfo.position}
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <Icon
                      type="environment"
                      style={{ marginRight: 12, fontSize: 14 }}
                    />
                    江苏省 南京市
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <Icon
                      type="mail"
                      style={{ marginRight: 12, fontSize: 14 }}
                    />
                    {userInfo.email}
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <Icon
                      type="phone"
                      style={{ marginRight: 12, fontSize: 14 }}
                    />
                    {userInfo.phone}
                  </p>
                </List.Item>
              </List>
            </div>
            <Divider dashed />
          </Card>
        </Col>
        <Col md={24} lg={17} style={{ padding: '0 12px' }}>
          <Card
            style={{ width: '100%' }}
            tabList={tabList}
            activeTabKey={tabKey}
            onTabChange={handleTabChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfo;
