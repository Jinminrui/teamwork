import React from 'react';
import {
  FileTextOutlined,
  BulbOutlined,
  SyncOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { priorityColorMap } from 'config';
import StoryIcon from 'components/Icon/StoryIcon';

interface Props {
  detail: any;
  handleCardClick: () => void;
}

const TaskCard: React.FC<Props> = ({ detail, handleCardClick }) => (
  <div className="kanban-dnd-card">
    <div
      className="task-card"
      onClick={e => {
        e.stopPropagation();
        handleCardClick();
      }}
    >
      <div
        className="task-priority"
        style={{ background: priorityColorMap.get(detail.priority) }}
      />
      <div className="task-card-body">
        <div className="task-detail-content">
          <div className="task-content">
            <div className="task-name">{detail.title}</div>
            <div className="task-executor">
              {detail.executor !== 'none' && (
              <Avatar size="small" src={detail.executorInfo.avatar} />
              )}
            </div>
          </div>
          <div className="task-infos">
            {detail.type === 1 && (
            <span className="type-icon info-item">
              <StoryIcon />
            </span>
            )}
            {detail.note && (
            <span className="task-note info-item">
              <FileTextOutlined className="icon" />
            </span>
            )}
            {detail.storyPoints !== null && (
            <span className="storypoint-info info-item">
              <BranchesOutlined className="icon" /> {detail.storyPoints}
            </span>
            )}
            {detail.sprint && (
            <span className="sprint-info info-item">
              <SyncOutlined className="icon" /> {detail.sprint}
            </span>
            )}
            <span className="type-desc info-item">
              <BulbOutlined className="icon" />
                需求分类：{detail.taskClassDetail.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TaskCard;
