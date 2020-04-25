import React, { useState, useEffect } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { Row, Col, Avatar, List, Empty, Tag } from 'antd';
import moment from 'moment';
import { getActivityList } from 'api/activity';
import { projectStatusMap } from 'config';

const Summary = () => {
  const projectInfo = useSelector((store: Store) => store.project.detail);
  const { teamId } = useSelector((store: Store) => store.team);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (teamId && projectInfo) {
      setLoading(true);
      getActivityList({ teamId, projectId: projectInfo.pkId }).then(res => {
        setList(res.data);
        setLoading(false);
      });
    }
  }, [teamId, projectInfo]);
  return (
    <div className="summary-container">
      <div className="summary-wrapper">
        <div className="summary-content">
          {projectInfo && (
            <div>
              <Row gutter={24}>
                <Col span={16}>
                  <div className="card-wrapper">
                    <div className="card-header">
                      <div className="card-title">项目动态</div>
                    </div>
                    <List
                      itemLayout="horizontal"
                      dataSource={list}
                      loading={loading}
                      locale={{
                        emptyText: <Empty description="暂无项目动态" />,
                      }}
                      renderItem={(item: any) => (
                        <List.Item style={{ padding: '16px 20px' }}>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={item.creatorDetail.avatar}
                                size={32}
                              />
                            }
                            title={item.title}
                            description={moment(item.createTime).fromNow()}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className="card-wrapper">
                    <div className="projectInfo-header">
                      <Avatar
                        src={projectInfo?.cover}
                        shape="square"
                        size={64}
                      />
                      <div className="projectInfo-header-text">
                        <div style={{ display: 'flex' }}>
                          <h3 className="projectInfo-name">
                            {projectInfo.name}
                            <Tag
                              style={{ marginLeft: 8 }}
                              color={
                              projectStatusMap.get(projectInfo.status)?.color
                            }
                            >
                              {projectStatusMap.get(projectInfo.status)?.desc}
                            </Tag>
                          </h3>
                        </div>
                        <div className="projectInfo-createInfo">
                          金敏睿{' '}
                          {`创建于 ${moment(projectInfo.createTime).format(
                            'YYYY年MM月DD日'
                          )}`}
                        </div>
                      </div>
                    </div>
                    <div className="projectInfo-desc">
                      项目简介：{projectInfo.description}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
