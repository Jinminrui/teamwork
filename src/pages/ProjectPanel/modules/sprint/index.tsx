import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  MenuFoldOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListSagaAction } from 'store/task/task.action';
import { Store } from 'types';
import SprintList from './components/SprintList';
import CreateSprintModal from './components/CreateSprintModal';
import TaskTable from './components/TaskTable';

const { Sider, Content } = Layout;

const Sprint = (props: RouteComponentProps) => {
  const userId = useSelector((store: Store) => store.user.pkId);
  const [collapsed, setCollapsed] = useState(false);
  const [createSprintModalVisible, setCreateSprintModalVisible] = useState(
    false
  );
  const [current, setCurrent] = useState<any>({
    id: undefined,
    name: '所有任务',
  });
  const projectId = (props.match.params as any).id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskListSagaAction({ projectId, userId, sprint: current.id }));
  }, [dispatch, projectId, userId, current.id]);

  return (
    <Layout className="sprint-panel-container">
      <div className="sprint-sider-container">
        <Sider
          style={{ height: '100%' }}
          theme="light"
          width={298}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
        >
          <div className="sprint-classify-container">
            <div className="sprint-classify-header">
              <div className="sprint-classify-title">迭代</div>
              <div
                className="add-sprint-btn"
                onClick={() => {
                  setCreateSprintModalVisible(true);
                }}
              >
                <PlusOutlined />
              </div>
            </div>
            <SprintList
              projectId={projectId}
              current={current}
              onSprintChange={(value: any) => {
                setCurrent(value);
              }}
            />
          </div>
        </Sider>
        <div
          className="trigger-container"
          style={{ left: !collapsed ? 298 : 0 }}
        >
          <div className="border-line" />
          <div
            className="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {!collapsed && <LeftOutlined />}
            {collapsed && <RightOutlined />}
          </div>
        </div>
      </div>
      <Content
        style={{ paddingTop: 10, paddingLeft: 24, background: '#f6f6f6' }}
        className="panel-layout"
      >
        <div className="sprint-content-container">
          <div className="sprint-class-header">
            <div className="sprint-class-title">
              <MenuFoldOutlined style={{ marginRight: 8 }} />
              {current.name}
            </div>
          </div>
          <TaskTable projectId={projectId} sprintId={current.id} />
        </div>
      </Content>
      <CreateSprintModal
        projectId={projectId}
        visible={createSprintModalVisible}
        setUnVisible={() => {
          setCreateSprintModalVisible(false);
        }}
      />
    </Layout>
  );
};

export default Sprint;
