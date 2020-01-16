import React, { useState } from 'react';
import {
  EnvironmentOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Row, Col, Card, Avatar, Divider, List } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import ArticleList from 'components/ArticleList';
// import { getArticleList } from 'api/article';
import ProjectList from 'components/ProjectList';
// import { getProjectList } from 'api/project';

const PersonalInfo: React.FC = () => {
  const [tabKey, setTabKey] = useState('article');
  const [articleNum] = useState(0);
  const [articleLsit] = useState([]);
  const [projectList] = useState([]);
  const [projectNum] = useState(0);
  // const [pageSize] = useState(8);
  // const [pageNum] = useState(1);
  const userInfo = useSelector((store: Store) => store.user);
  // const userId = userInfo.id;

  // useEffect(() => {
  //   getArticleList({ userId, pageNum, pageSize }).then(res => {
  //     setArticleList(res.data.list);
  //     setArticleNum(res.data.total);
  //   });
  // }, [userId, pageNum, pageSize]);

  // useEffect(() => {
  //   getProjectList().then(res => {
  //     setProjectList(res.data.list);
  //     setProjectNum(res.data.total);
  //   });
  // }, [userId]);

  const tabList = [
    {
      key: 'article',
      tab: `文章（${articleNum}）`,
    },
    {
      key: 'project',
      tab: `项目（${projectNum}）`,
    },
  ];

  const contentList: any = {
    article: <ArticleList articleList={articleLsit} />,
    project: <ProjectList projectList={projectList} />,
  };

  function handleTabChange(key: string) {
    setTabKey(key);
  }
  return (
    <div className="personalInfo-wrapper">
      <Row gutter={24}>
        <Col md={24} lg={8} style={{ padding: '0 12px', marginBottom: '24px' }}>
          <Card>
            <div className="personalInfo-avatar-wrapper">
              <Avatar src={userInfo.avatar} size={104} className="avatar-img" />
              <div className="username">{userInfo.username}</div>
              <div className="desc">{userInfo.description}</div>
            </div>
            <div className="personalInfo-detail-wrapper">
              <List
                grid={{
                  gutter: 16,
                  xs: 2,
                  lg: 1,
                  xl: 1,
                  xxl: 2,
                }}
              >
                <List.Item className="detail-item">
                  <p>
                    <IdcardOutlined style={{ marginRight: 12, fontSize: 14 }} />
                    {userInfo.position}
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <EnvironmentOutlined
                      style={{ marginRight: 12, fontSize: 14 }}
                    />
                    江苏省 南京市
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <MailOutlined style={{ marginRight: 12, fontSize: 14 }} />
                    {userInfo.email}
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <PhoneOutlined style={{ marginRight: 12, fontSize: 14 }} />
                    {userInfo.phone}
                  </p>
                </List.Item>
              </List>
            </div>
            <Divider dashed />
          </Card>
        </Col>
        <Col md={24} lg={16} style={{ padding: '0 12px' }}>
          <Card
            style={{ width: '100%' }}
            tabList={tabList}
            activeTabKey={tabKey}
            onTabChange={handleTabChange}
          >
            {contentList[tabKey]}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfo;
