import React from 'react';
import { Layout, Menu } from 'antd';
import './index.scss';
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
  Redirect,
} from 'react-router-dom';
import Story from './modules/story';

const PanelNav = withRouter((props: RouteComponentProps) => {
  const routeParams: any = props.match.params;
  const projectId = routeParams.id;
  const { pathname } = props.location;
  const currentKey = pathname.split('/')[4];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[currentKey]}
      onClick={params => {
        props.history.push(`/home/project/${projectId}/${params.key}`);
      }}
    >
      <Menu.Item key="story">需求</Menu.Item>
      <Menu.Item key="bug">缺陷</Menu.Item>
      <Menu.Item key="sprint">迭代</Menu.Item>
      <Menu.Item key="task">任务</Menu.Item>
      <Menu.Item key="events">日程</Menu.Item>
      <Menu.Item key="analytics">统计</Menu.Item>
      <Menu.Item key="summary">概览</Menu.Item>
    </Menu>
  );
});

const ProjectPanel = (props: RouteComponentProps) => (
  <Layout className="projectPanel-container">
    <div className="projectPanel-header">
      <PanelNav />
    </div>
    <Switch>
      <Route exact path="/home/project/:id" component={() => <Redirect to={`${props.location.pathname}/story`} />} />
      <Route path="/home/project/:id/story" component={Story} />
    </Switch>
  </Layout>
);

export default ProjectPanel;
