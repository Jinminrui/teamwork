import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import {
  Tag,
  Menu,
  Dropdown,
  Progress,
  Modal,
  Typography,
  message,
} from 'antd';
import { formatDateCalendar } from 'utils';
import { sprintStatusMap, sprintStatusColorMap } from 'config';
import {
  EllipsisOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { deleteSprint, startSprint, completeSprint } from 'api/sprint';
import { getSpringLisSagaAction } from 'store/task/task.action';
import moment from 'moment';
import ViewSprintModal from './ViewSprintModal';

const { confirm } = Modal;

const { Paragraph } = Typography;

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
  const [sprint, setSprint] = useState<any>();
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
        deleteSprint(sprint?.pkId).then(() => {
          dispatch(getSpringLisSagaAction({ projectId }));
        });
      },
    });
  };

  const handleStartSprint = () => {
    confirm({
      title: '开始迭代',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Paragraph>迭代名称：{sprint.title}</Paragraph>
          <Paragraph>
            迭代周期：{formatDateCalendar(sprint.startTime)} -{' '}
            {formatDateCalendar(sprint.endTime)}
          </Paragraph>
        </div>
      ),
      okText: '确定',
      cancelText: '放弃',
      onOk() {
        if (projectId && sprint) {
          const { pkId, startTime, endTime } = sprint;
          startSprint({ pkId, startTime, endTime }).then(res => {
            dispatch(getSpringLisSagaAction({ projectId }));
          });
        }
      },
    });
  };

  const handleCompleteSprint = () => {
    confirm({
      title: '完成迭代',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Paragraph>迭代名称：{sprint.title}</Paragraph>
          <Paragraph>
            请检查迭代中任务的完成情况，如有未完成的任务，将无法结束迭代
          </Paragraph>
        </div>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk() {
        if (sprint) {
          completeSprint(sprint.pkId).then((res: any) => {
            if (res.code === 200) {
              message.success(res.desc);
            }
          });
        }
      },
    });
  };

  const SprintOptions = () => (
    <Menu onClick={e => e.domEvent.stopPropagation()}>
      <Menu.Item onClick={handleViewSprint}>
        <InfoCircleOutlined />
        迭代详情
      </Menu.Item>
      <Menu.Item onClick={handleStartSprint} disabled={sprint.status !== 1}>
        <PlayCircleOutlined />
        开始迭代
      </Menu.Item>
      <Menu.Item onClick={handleCompleteSprint} disabled={sprint.status !== 2}>
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
      {sprintList
        .sort((a, b) => (moment(a.createTime).isBefore(b.createTime) ? -1 : 1))
        .map(item => (
          <div
            className={`sprint-list-item ${current.id === item.pkId &&
              'active'}`}
            onClick={() => onSprintChange({ id: item.pkId, name: item.title })}
            key={item.pkId}
          >
            <div className="sprint-item-header">
              <div className="sprint-name">{item.title}</div>
              <div className="sprint-options">
                <Tag color={sprintStatusColorMap.get(item.status)}>
                  {sprintStatusMap.get(item.status)}
                </Tag>
                <div
                  className="actions"
                  onClick={e => {
                    e.stopPropagation();
                    setSprint(item);
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
        sprintId={sprint?.pkId}
      />
    </div>
  );
};

export default SprintList;
