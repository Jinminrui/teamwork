import React from 'react';
import {
  FileTextOutlined,
  BulbOutlined,
  SyncOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import { priorityColorMap } from 'config';
import StoryIcon from 'components/Icon/StoryIcon';
import BugIcon from 'components/Icon/BugIcon';
import { formatDateCalendar } from 'utils';

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
        <div
          className={`task-detail-content ${
            detail.stage === '已完成' ||
            detail.stage === '关闭' ||
            detail.stage === '已拒绝' ||
            detail.stage === '已解决'
              ? 'done'
              : ''
          }`}
        >
          <div className="task-content">
            <div className="task-name">{detail.title}</div>
            <div className="task-executor">
              {detail.executor !== 'none' && (
                <Avatar size="small" src={detail.executorInfo.avatar} />
              )}
            </div>
          </div>
          <div className="task-infos">
            {detail.type === 1 ? (
              <span className="type-icon info-item">
                <StoryIcon />
              </span>
            ) : (
              <span className="type-icon info-item">
                <BugIcon />
              </span>
            )}
            {detail.startTime && detail.endTime && (
              <span className="info-item" style={{ marginRight: 4 }}>
                <Tag color={priorityColorMap.get(detail.priority)}>
                  {formatDateCalendar(detail.startTime)}
                  <span style={{ margin: '0 4px' }}>-</span>
                  {formatDateCalendar(detail.endTime)}
                </Tag>
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
            {detail.sprint !== 'default' && (
              <span className="sprint-info info-item">
                <SyncOutlined className="icon" /> {detail.sprintDetail.title}
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
