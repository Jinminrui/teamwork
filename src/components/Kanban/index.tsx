import React, { useEffect } from 'react';
import { storyWorkflow, bugWorkflow } from 'config';
import './index.scss';
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { getTaskListSagaAction } from 'store/task/task.action';
import KanBanItem from './item';

interface Props {
  type: number;
  taskClass: any;
  projectId: string;
}

const KanBan: React.FC<Props> = ({ type, taskClass, projectId }) => {
  const workflow = type === 1 ? storyWorkflow : bugWorkflow;
  const { taskList, taskListLoading } = useSelector((store: Store) => store.task);
  const userId = useSelector((store: Store) => store.user.pkId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskListSagaAction({ userId, projectId, type, taskClass: taskClass.pkId }));
  }, [dispatch, projectId, type, taskClass, userId]);
  return (
    <Spin spinning={taskListLoading} tip="加载中...">
      <div className="kanban-container">
        <div className="kanban-body">
          {workflow.map(item => (
            <KanBanItem
              key={item.name}
              stage={item}
              projectId={projectId}
              type={type}
              taskClass={taskClass.pkId}
              taskList={taskList.filter(e => e.stage === item.name)}
            />
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default KanBan;
