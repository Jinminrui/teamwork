import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Drawer,
  List,
  Avatar,
  Button,
  Modal,
  message,
} from 'antd';
import './index.scss';
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProjectMembersSagaAction,
  getProjectDetailSagaAction,
} from 'store/project/project.action';
import { setTaskList, getSpringLisSagaAction } from 'store/task/task.action';
import {
  TeamOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Store } from 'types';
import { inviteProjectMember } from 'api/project';
import Story from './modules/story';
import Bug from './modules/bug';
import Analytics from './modules/analytics';
import Summary from './modules/summary';
import Sprint from './modules/sprint';

const PanelNav = withRouter((props: RouteComponentProps) => {
  const projectId = (props.match.params as any).id;
  const { pathname } = props.location;
  const currentKey = pathname.split('/')[4];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[currentKey]}
      onClick={params => {
        props.history.push(`/home/project/${projectId}/${params.key}`);
      }}
      style={{ width: 'fit-content' }}
    >
      <Menu.Item key="story">需求</Menu.Item>
      <Menu.Item key="bug">缺陷</Menu.Item>
      <Menu.Item key="sprint">迭代</Menu.Item>
      <Menu.Item key="analytics">统计</Menu.Item>
      <Menu.Item key="summary">概览</Menu.Item>
    </Menu>
  );
});

const ProjectPanel = (props: RouteComponentProps) => {
  const projectId = (props.match.params as any).id;
  const { members, detail } = useSelector((store: Store) => store.project);
  const teamMembers = useSelector((store: Store) => store.team.memberList);
  const [memberListVisible, setMemberListVisible] = useState(false);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectMembersSagaAction(projectId));
    dispatch(getProjectDetailSagaAction(projectId));
    dispatch(getSpringLisSagaAction({ projectId }));
    return () => {
      dispatch(setTaskList([]));
    };
  }, [dispatch, projectId]);

  function hasJoined(userId: string) {
    return members.find(item => item.info.pkId === userId);
  }

  function handleAddMember(userId: string) {
    inviteProjectMember({ projectId, userId }).then(res => {
      message.success('邀请成功');
      dispatch(getProjectMembersSagaAction(projectId));
    });
  }

  return (
    <Layout className="projectPanel-container">
      <div className="projectPanel-header">
        <PanelNav />
        <div
          className="project-member"
          onClick={() => {
            setMemberListVisible(!memberListVisible);
          }}
        >
          <TeamOutlined style={{ fontSize: 18, marginRight: 4 }} />
          <span>{members.length}</span>
        </div>
      </div>
      <div className="projectPanel-content">
        <Switch>
          <Route
            exact
            path="/home/project/:id"
            component={() => (
              <Redirect to={`${props.location.pathname}/story`} />
            )}
          />
          <Route path="/home/project/:id/story" component={Story} />
          <Route path="/home/project/:id/bug" component={Bug} />
          <Route path="/home/project/:id/sprint" component={Sprint} />
          <Route path="/home/project/:id/analytics" component={Analytics} />
          <Route path="/home/project/:id/summary" component={Summary} />
        </Switch>
        <Drawer
          title="项目成员"
          placement="right"
          closable
          mask={false}
          maskClosable={false}
          onClose={() => setMemberListVisible(false)}
          visible={memberListVisible}
          getContainer={false}
          style={{ position: 'absolute', height: 'calc(100vh - 112px)' }}
          bodyStyle={{ padding: 0, background: '#f7f7f7' }}
          headerStyle={{ background: '#f7f7f7' }}
          width={400}
        >
          <List
            dataSource={members}
            renderItem={item => (
              <List.Item key={item.info.pkId} className="members-list-item">
                <List.Item.Meta
                  avatar={<Avatar src={item.info.avatar} />}
                  title={item.info.username}
                  description={item.info.position}
                />
                <div>{item.role === 1 && '创建者'}</div>
              </List.Item>
            )}
          />
          {detail?.currentRole === 1 && (
            <Button
              type="link"
              icon={<PlusCircleFilled />}
              style={{ marginTop: 10 }}
              onClick={() => {
                setAddMemberModalVisible(true);
              }}
            >
              添加项目成员
            </Button>
          )}
        </Drawer>
        <Modal
          visible={addMemberModalVisible}
          title="添加项目成员"
          footer={null}
          onCancel={() => { setAddMemberModalVisible(false); }}
        >
          <List
            dataSource={teamMembers}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.username}
                  description={item.position}
                />
                <div style={{ color: '#40a9ff' }}>
                  {hasJoined(item.pkId) ? (
                    '已加入'
                  ) : (
                    <PlusCircleOutlined className="add-member-btn" onClick={() => { handleAddMember(item.pkId); }} />
                  )}
                </div>
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default ProjectPanel;
