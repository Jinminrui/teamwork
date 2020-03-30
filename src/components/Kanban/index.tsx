import React, { useEffect } from 'react';
import { storyWorkflow } from 'config';
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
  const workflow = type === 1 ? storyWorkflow : [];
  const { taskList, taskListLoading } = useSelector((store: Store) => store.task);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskListSagaAction({ projectId, type, taskClass: taskClass.pkId }));
  }, [dispatch, projectId, type, taskClass]);
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
