import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreateTaskProps,
  setViewTaskProps,
  getTaskListSagaAction,
} from 'store/task/task.action';
import CreateTaskModal from 'components/CreateTaskModal';
import { Store } from 'types';
import IconFont from '../IconFont';
import TaskCard from './TaskCard';

interface Props {
  stage: any;
  type: number;
  taskClass: any;
  projectId: string;
  taskList: Array<any>;
}

const Item: React.FC<Props> = ({
  stage,
  type,
  taskClass,
  projectId,
  taskList,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((store: Store) => store.user.pkId);

  const handleCreateStory = () => {
    dispatch(setCreateTaskProps({ visible: true, type, projectId, taskClass, stage: stage.name }));
  };

  return (
    <div className="kanban-col" key={stage.name}>
      <div className="kanban-col-header">
        <div className="kanban-col-title">
          {stage.name} · {taskList.length}
        </div>
        <div className="kanban-col-action">
          <IconFont style={{ fontSize: 20 }} type="icon-dot" />
        </div>
      </div>
      <div className="kanban-col-content">
        {taskList.map((item: any) => (
          <TaskCard
            key={item.pkId}
            detail={item}
            handleCardClick={() => {
              dispatch(
                setViewTaskProps({
                  visible: true,
                  taskId: item.pkId,
                  projectId,
                  type,
                  taskClass,
                  refetch: () => {
                    dispatch(
                      getTaskListSagaAction({
                        userId,
                        projectId,
                        type,
                        taskClass,
                      })
                    );
                  },
                })
              );
            }}
          />
        ))}
      </div>
      {stage.addable && (
        <div className="add-task-btn" onClick={handleCreateStory}>
          <PlusOutlined />
        </div>
      )}
      {stage.addable && <CreateTaskModal />}
    </div>
  );
};

export default Item;
