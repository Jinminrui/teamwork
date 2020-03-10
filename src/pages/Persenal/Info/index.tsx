import React, { useState, useEffect } from 'react';
import { IdcardOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Row, Col, Card, Avatar, Divider, List } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import ArticleList from 'components/ArticleList';
// import { getArticleList } from 'api/article';
import ProjectList from 'components/ProjectList';
import { getDocList, GetDocListParams } from 'api/doc';
// import { getProjectList } from 'api/project';

const PersonalInfo: React.FC = () => {
  const [tabKey, setTabKey] = useState('article');
  const [articleTotal, setArticleTotal] = useState(0);
  const [articleLsit, setArticleList] = useState([]);
  const [projectList] = useState([]);
  const [projectNum] = useState(0);
  // const [pageSize] = useState(8);
  // const [pageNum] = useState(1);
  const userInfo = useSelector((store: Store) => store.user);
  const { teamId } = useSelector((store: Store) => store.team);
  const [articlePageNum, setArticlePageNum] = useState<any>(1);
  const [articleLoading, setArticleLoading] = useState(false);
  // const userId = userInfo.id;

  const pageSize = 5;

  useEffect(() => {
    if (teamId) {
      const params: GetDocListParams = {
        authorIds: [userInfo.pkId],
        types: [],
        pageNum: articlePageNum,
        pageSize,
        teamId,
      };
      setArticleLoading(true);
      getDocList(params).then(res => {
        setArticleList(res.data.list);
        setArticleTotal(res.data.total);
        setArticleLoading(false);
      });
    }
  }, [teamId, articlePageNum, userInfo.pkId]);

  // useEffect(() => {
  //   getProjectList().then(res => {
  //     setProjectList(res.data.list);
  //     setProjectNum(res.data.total);
  //   });
  // }, [userId]);

  const tabList = [
    {
      key: 'article',
      tab: `文章（${articleTotal}）`,
    },
    {
      key: 'project',
      tab: `项目（${projectNum}）`,
    },
  ];

  const handleArticlePageChange = (page: any) => {
    setArticlePageNum(page);
  };

  const contentList: any = {
    article: (
      <ArticleList
        articleList={articleLsit}
        total={articleTotal}
        loading={articleLoading}
        pageSize={pageSize}
        onPageChange={handleArticlePageChange}
      />
    ),
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
                    {userInfo.position || '尚未填写职位'}
                  </p>
                </List.Item>
                <List.Item className="detail-item">
                  <p>
                    <MailOutlined style={{ marginRight: 12, fontSize: 14 }} />
                    {userInfo.email || '尚未填写邮箱'}
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
