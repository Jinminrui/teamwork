import React, { useState } from 'react';
import './index.scss';
import { Menu, Divider } from 'antd';
import {
  BarsOutlined,
  HomeOutlined,
  TeamOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import ProjectList from 'components/ProjectList';
import RecentTask from './components/RecentTask';
import TaskList from './components/TaskList';

const Project = () => {
  const [currentKey, setCurrentKey] = useState('home');
  return (
    <div className="project-center-wrapper">
      <div className="left-siderbar-wrapper">
        <Menu
          mode="vertical"
          className="menu"
          defaultSelectedKeys={[currentKey]}
          onClick={params => {
            setCurrentKey(params.key);
          }}
        >
          <Menu.Item key="home">
            <HomeOutlined />
            首页
          </Menu.Item>
          <Menu.Item key="myexe">
            <BarsOutlined />
            我执行的
          </Menu.Item>
          <Menu.Item key="mycreate">
            <FileAddOutlined />
            我创建的
          </Menu.Item>
          <Menu.Item key="myjoin">
            <TeamOutlined />
            我参与的
          </Menu.Item>
        </Menu>
      </div>
      <div className="project-center-content-container">
        {currentKey === 'home' ? (
          <div>
            <RecentTask />
            <div className="title" style={{ marginTop: 50, marginBottom: 20 }}>我参与的项目</div>
            <ProjectList />
          </div>
        ) : (
          <TaskList type={currentKey} />
        )}
      </div>
    </div>
  );
};

export default Project;
