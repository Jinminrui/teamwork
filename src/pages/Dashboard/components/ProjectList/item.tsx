import React from 'react';
import { Avatar } from 'antd';
import './index.scss';

const ProjectItem: React.FC = () => (
  <div className="dashborad-project-item-wrapper">
    <div className="dashborad-project-item-title">
      <Avatar size="small" className="avatar">
        Pro
      </Avatar>
      <a href="/" className="project-name">
        项目名称
      </a>
    </div>
    <div className="dashborad-project-item-desc">
      <p>希望是一个好东西，也许是最好的，好东西是不会消亡的</p>
    </div>
    <div className="dashborad-project-item-footer">
      <div className="dashborad-project-item-update-time">2天前</div>
    </div>
  </div>
);

export default ProjectItem;
