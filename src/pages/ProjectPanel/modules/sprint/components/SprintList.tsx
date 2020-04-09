import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { Tag, Menu, Dropdown, Progress, Modal } from 'antd';
import { formatDateCalendar } from 'utils';
import { sprintStatusMap } from 'config';
import {
  EllipsisOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  SwapOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { deleteSprint } from 'api/sprint';
import { getSpringLisSagaAction } from 'store/task/task.action';
import ViewSprintModal from './ViewSprintModal';

const { confirm } = Modal;

interface Props {
  current: any;
  projectId: string;
  onSprintChange: (value: any) => void;
}

const SprintList: React.FC<Props> = ({
  current,
  onSprintChange,
  projectId,
}) => {
  const dispatch = useDispatch();
  const { sprintList } = useSelector((store: Store) => store.task);
  const [viewSprintModalVisible, setViewSprintModalVisible] = useState(false);
  const [sprintId, setSprintId] = useState('');
  const handleViewSprint = () => {
    setViewSprintModalVisible(true);
  };

  const handleDeleteSprint = () => {
    confirm({
      title: '确定要删除这个迭代吗？',
      icon: <ExclamationCircleOutlined />,
      content: '该操作不可撤销，一旦删除该迭代下的所有任务将被设为未规划任务',
      okText: '确定',
      cancelText: '放弃',
      okType: 'danger',
      onOk() {
        deleteSprint(sprintId).then((res: any) => {
          dispatch(getSpringLisSagaAction({ projectId }));
        });
      },
    });
  };

  const SprintOptions = () => (
    <Menu onClick={e => e.domEvent.stopPropagation()}>
      <Menu.Item onClick={handleViewSprint}>
        <InfoCircleOutlined />
        迭代详情
      </Menu.Item>
      <Menu.Item>
        <SwapOutlined />
        规划迭代
      </Menu.Item>
      <Menu.Item>
        <CheckCircleOutlined />
        完成迭代
      </Menu.Item>
      <Menu.Item onClick={handleDeleteSprint}>
        <DeleteOutlined />
        删除迭代
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="sprint-list-container">
      <div
        className={`all-task sprint-list-item ${current.id === undefined &&
          'active'}`}
        onClick={() => onSprintChange({ id: undefined, name: '所有任务' })}
      >
        <span className="sprint-name">所有任务</span>
      </div>
      <div
        className={`unPlaned-task sprint-list-item ${current.id === 'default' &&
          'active'}`}
        onClick={() => onSprintChange({ id: 'default', name: '未规划的任务' })}
      >
        <span className="sprint-name">未规划的任务</span>
      </div>
      {sprintList.map(item => (
        <div
          className={`sprint-list-item ${current.id === item.pkId && 'active'}`}
          onClick={() => onSprintChange({ id: item.pkId, name: item.title })}
          key={item.pkId}
        >
          <div className="sprint-item-header">
            <div className="sprint-name">{item.title}</div>
            <div className="sprint-options">
              <Tag>{sprintStatusMap.get(item.status)}</Tag>
              <div
                className="actions"
                onClick={e => {
                  e.stopPropagation();
                  setSprintId(item.pkId);
                }}
              >
                <Dropdown
                  overlay={SprintOptions}
                  trigger={['click']}
                  placement="bottomLeft"
                >
                  <EllipsisOutlined />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="sprint-subtitle">
            {item.startTime && (
              <span>{formatDateCalendar(item.startTime)}</span>
            )}
            <span style={{ margin: '0 4px' }}>-</span>
            {item.endTime && <span>{formatDateCalendar(item.endTime)}</span>}
          </div>
          <div className="sprint-subtitle">
            任务
            <span style={{ margin: '0 4px' }}>
              {item.doneTask} / {item.allTask}
            </span>
            <Progress
              type="circle"
              trailColor="#e5e5e5"
              percent={(item.doneTask / item.allTask) * 100}
              showInfo={false}
              strokeWidth={14}
              width={16}
            />
          </div>
        </div>
      ))}
      <ViewSprintModal
        projectId={projectId}
        visible={viewSprintModalVisible}
        setUnvisible={() => {
          setViewSprintModalVisible(false);
        }}
        sprintId={sprintId}
      />
    </div>
  );
};

export default SprintList;
