import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { PageHeader, Tag } from 'antd';
import { projectStatusMap } from 'config';
import moment from 'moment';

const Summary = () => {
  const projectInfo = useSelector((store: Store) => store.project.detail);
  return (
    <div className="summary-container">
      <div className="summary-wrapper">
        <div className="summary-content">
          {projectInfo && (
            <PageHeader
              ghost={false}
              title={projectInfo?.name}
              avatar={{ src: projectInfo?.cover, shape: 'square', size: 32 }}
              subTitle={`创建于 ${moment(projectInfo.createTime).format('YYYY年MM月DD日')}`}
              tags={
                <Tag color={projectStatusMap.get(projectInfo.status)?.color}>
                  {projectStatusMap.get(projectInfo.status)?.desc}
                </Tag>
              }
            >
              <p>项目简介：{projectInfo.description}</p>
            </PageHeader>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
