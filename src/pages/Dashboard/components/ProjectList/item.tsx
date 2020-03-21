import React from 'react';
import { Avatar } from 'antd';
import './index.scss';
import { ProjectListItem } from 'store/project/project.reducer';

interface Props {
  detail: ProjectListItem;
}

const ProjectItem: React.FC<Props> = (props: Props) => (
  <div className="dashborad-project-item-wrapper">
    <div className="dashborad-project-item-title">
      <Avatar className="avatar" src={props.detail.cover} />
      <a href="/" className="project-name">
        {props.detail.name}
      </a>
    </div>
    <div className="dashborad-project-item-desc">
      <p>{props.detail.description}</p>
    </div>
    <div className="dashborad-project-item-footer">
      <div className="dashborad-project-item-update-time">2天前</div>
    </div>
  </div>
);

export default ProjectItem;
