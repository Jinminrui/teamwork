import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { Table, Avatar, Tag } from 'antd';
import { formatDateCalendar } from 'utils';
import { UserOutlined } from '@ant-design/icons';
import { priorityDescMap, priorityColorMap, getStatusTagColor } from 'config';
import StoryIcon from 'components/Icon/StoryIcon';
import BugIcon from 'components/Icon/BugIcon';
import {
  setViewTaskProps,
  getTaskListSagaAction,
} from 'store/task/task.action';

interface Props {
  projectId: string;
  sprintId?: string;
}

const TaskTable: React.FC<Props> = ({ projectId, sprintId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store: Store) => store.user);
  const tableHeight: number =
    document.documentElement.getBoundingClientRect().height - 240;
  const { taskList, taskListLoading } = useSelector(
    (store: Store) => store.task
  );

  const columns: any = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 298,
      fixed: 'left',
      ellipsis: true,
      render: (text: any, record: any, index: any) => (
        <span>
          <span className="index">{index + 1}</span>
          {text}
        </span>
      ),
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (item: any) => (item === 1 ? (
        <span className="type-cell">
          <StoryIcon />
          <span className="desc">需求</span>
        </span>
      ) : (
        <span className="type-cell">
          <BugIcon />
          <span className="desc">缺陷</span>
        </span>
      )),
    },
    {
      title: '执行者',
      dataIndex: 'executorInfo',
      key: 'executorInfo',
      width: 180,
      ellipsis: true,
      render: (item: any) => (item ? (
        <div className="cell-avatar">
          <Avatar src={item?.avatar} style={{ marginRight: 8 }} size={24} />
          {item?.username}
        </div>
      ) : (
        <div className="cell-avatar">
          <Avatar
            icon={<UserOutlined />}
            style={{ marginRight: 8 }}
            size={24}
          />
            待认领
        </div>
      )),
    },
    {
      title: '状态',
      dataIndex: 'stage',
      key: 'stage',
      width: 180,
      ellipsis: true,
      render: (item: any) => <Tag color={getStatusTagColor(item)}>{item}</Tag>,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 180,
      ellipsis: true,
      render: (item: any) => (
        <Tag color={priorityColorMap.get(item)}>
          {priorityDescMap.get(item)}
        </Tag>
      ),
    },
    {
      title: '迭代',
      dataIndex: 'sprintDetail',
      key: 'sprintDetail',
      width: 180,
      ellipsis: true,
      render: (item: any) => (item ? item.title : ''),
    },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
      ellipsis: true,
      render: (value: any) => (value ? formatDateCalendar(value) : '待设置'),
    },
    {
      title: 'Story Points',
      dataIndex: 'storyPoints',
      key: 'storyPoints',
      width: 180,
      ellipsis: true,
    },
    {
      title: '任务分类',
      dataIndex: 'taskClassDetail',
      key: 'taskClassDetail',
      width: 180,
      ellipsis: true,
      render: (item: any) => (item ? item.name : ''),
    },
  ];
  return (
    <Table
      loading={taskListLoading}
      pagination={false}
      columns={columns}
      bordered
      style={{ marginTop: 12, marginRight: 24 }}
      scroll={{ x: 1200, y: tableHeight }}
      dataSource={taskList}
      rowKey="pkId"
      size="small"
      onRow={record => ({
        onClick: () => {
          dispatch(
            setViewTaskProps({
              visible: true,
              taskId: record.pkId,
              projectId,
              refetch: () => {
                dispatch(
                  getTaskListSagaAction({ projectId, sprint: sprintId, userId })
                );
              },
            })
          );
        },
      })}
    />
  );
};

export default TaskTable;
