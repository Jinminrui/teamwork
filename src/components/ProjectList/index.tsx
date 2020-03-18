import React, { useState, useEffect } from 'react';
import { ProjectListItem } from 'types';
import { Tooltip } from 'antd';
import './index.scss';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';

const ProjectList: React.FC = () => {
  const [projectList, setProjectList] = useState<Array<any>>([]);

  useEffect(() => {
    const temp = {
      id: '123123',
      cover:
        'https://tcs-ga.teambition.net/thumbnail/110z3251840899548ed5f8779ecc5d4afe64/w/600/h/300',
      name: '毕业设计',
      description: '毕业设计毕业设计毕业设计毕业设计',
    };
    setProjectList([temp, temp, temp, temp, temp]);
  }, []);

  return (
    <div className="project-list-wrapper">
      {projectList.map(item => (
        <div className="project-item-wrapper">
          <div
            className="item-card mask"
            style={{ backgroundImage: `url("${item.cover}")` }}
          >
            <div className="card-header">
              <div className="project-name">{item.name}</div>
              <div className="project-setting">
                <Tooltip title="打开项目设置">
                  <SettingOutlined style={{ fontSize: 16 }} />
                </Tooltip>
              </div>
            </div>
            <div className="card-middle">{item.description}</div>
          </div>
        </div>
      ))}
      <div className="project-item-wrapper">
        <div className="add-card item-card">
          <PlusOutlined />
          <p>创建新项目</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
