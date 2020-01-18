import React, { useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash';
import {
  CalendarOutlined,
  DashboardOutlined,
  DeleteOutlined,
  FolderOutlined,
  LineChartOutlined,
  ProjectOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import IconFont from 'components/IconFont';
import Dashboard from 'pages/Dashboard';
import PersonalInfo from 'pages/Persenal/Info';
import PersonalSetting from 'pages/Persenal/Settings';
import ErrorPage from 'pages/404';

import { getUesrInfo, logout } from 'api/user';
import { Store } from 'types';
import { setUserInfo } from 'store/user/user.action';
import { setScreenWidth } from 'store/app/app.action';
import Logo from './logo.svg';
import './index.scss';

const { Header, Sider, Content } = Layout;
const { Item, ItemGroup } = Menu;

interface Props extends RouteComponentProps {
  children?: ReactNode;
}

const Home: React.FC<Props> = (props: Props) => {
  const { pathname } = props.location;
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuVisiable, setUserMenuVisiable] = useState(false);
  const [paddingLeft, setPaddingLeft] = useState(256);
  const [headerWidth, setHeaderWidth] = useState('calc(100% - 256px)');
  const [currentKey, setCurrentKey] = useState(pathname.split('/')[2]);

  const userInfo = useSelector((store: Store) => store.user);
  const dispatch = useDispatch();

  const [clientWidth, setClientWidth] = useState(
    window.document.documentElement.getBoundingClientRect().width
  );

  function handleResize() {
    setClientWidth(
      window.document.documentElement.getBoundingClientRect().width
    );
  }

  window.onresize = throttle(handleResize, 2000);

  useEffect(() => {
    dispatch(setScreenWidth(clientWidth));
  }, [clientWidth, dispatch]);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      getUesrInfo(id).then(res => {
        dispatch(setUserInfo(res.data));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setCurrentKey(pathname.split('/')[2]);
  }, [pathname]);

  function toggle(): void {
    setCollapsed(!collapsed);
    setPaddingLeft(collapsed ? 256 : 80);
    setHeaderWidth(collapsed ? 'calc(100% - 256px)' : 'calc(100% - 80px)');
  }

  function handleMenuClick(): void {
    setUserMenuVisiable(false);
  }

  function handleVisibleChange(): void {
    setUserMenuVisiable(!userMenuVisiable);
  }

  function handleMenuItemClick(params: ClickParam): void {
    if (pathname !== `/home/${params.key}`) {
      props.history.push(`/home/${params.key}`);
    }
    setCurrentKey(params.key);
  }

  function handleLogout(): void {
    logout();
  }

  function handleGotoPersonalCenter() {
    if (pathname !== '/home/personal-info') {
      props.history.push('/home/personal-info');
    }
    setCurrentKey('personal-info');
  }

  function handleGotoPersonalSetting() {
    if (pathname !== '/home/personal-settings') {
      props.history.push('/home/personal-settings');
    }
    setCurrentKey('personal-settings');
  }

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" onClick={handleGotoPersonalCenter}>
        个人中心
      </Menu.Item>
      <Menu.Item key="2" onClick={handleGotoPersonalSetting}>
        个人设置
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        className="sider"
        breakpoint="lg"
        collapsedWidth="80"
        onCollapse={value => {
          setCollapsed(value);
          setPaddingLeft(collapsed ? 256 : 80);
          setHeaderWidth(
            collapsed ? 'calc(100% - 256px)' : 'calc(100% - 80px)'
          );
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
          {!collapsed && <h1>Team Work</h1>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[currentKey]}
          onClick={handleMenuItemClick}
          style={{ padding: '16px 0px', width: '100%' }}
        >
          <Menu.Item key="dashboard">
            <DashboardOutlined />
            <span>首页-工作台</span>
          </Menu.Item>
          <ItemGroup key="persenal" title="个人中心">
            <Item key="personal-info">
              <UserOutlined />
              <span>个人信息</span>
            </Item>
            <Item key="personal-settings">
              <SettingOutlined />
              <span>个人设置</span>
            </Item>
          </ItemGroup>
          <ItemGroup key="team" title="团队建设">
            <Menu.Item key="team-info">
              <TeamOutlined />
              <span>基础信息</span>
            </Menu.Item>
            <Menu.Item key="team-doc">
              <FolderOutlined />
              <span>团队文档</span>
            </Menu.Item>
            <Menu.Item key="weekly-report">
              <CalendarOutlined />
              <span>成员周报</span>
            </Menu.Item>
          </ItemGroup>

          <ItemGroup key="project" title="项目中心">
            <Menu.Item key="project-list">
              <ProjectOutlined />
              <span>项目列表</span>
            </Menu.Item>
            <Menu.Item key="project-analyze">
              <LineChartOutlined />
              <span>项目统计</span>
            </Menu.Item>
          </ItemGroup>

          <ItemGroup key="other" title="其他功能">
            <Menu.Item key="mystart">
              <StarOutlined />
              <span>我的收藏</span>
            </Menu.Item>
            <Menu.Item key="">
              <DeleteOutlined />
              <span>回收站</span>
            </Menu.Item>
          </ItemGroup>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft }}>
        <Header className="header" style={{ width: headerWidth }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
          <div className="right-wrapper">
            <div className="header-actions">
              <Badge count={10} className="badge">
                <IconFont style={{ fontSize: '20px' }} type="icon-tongzhi" />
              </Badge>
            </div>
            <Dropdown
              className="header-actions"
              overlay={userMenu}
              visible={userMenuVisiable}
              onVisibleChange={handleVisibleChange}
            >
              <div className="avatar-wrapper">
                <Avatar src={userInfo.avatar} />
                <span className="username">{userInfo.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="content-wrapper"
          style={{
            marginTop: 64,
          }}
        >
          <Switch>
            <Route
              exact
              path="/home"
              component={() => <Redirect to="/home/dashboard" />}
            />

            <Route
              exact
              path="/home/dashboard"
              key="/home/dashboard"
              component={Dashboard}
            />
            <Route
              exact
              path="/home/personal-info"
              key="/home/personal-info"
              component={PersonalInfo}
            />
            <Route
              exact
              path="/home/personal-settings"
              key="/home/personal-settings"
              component={PersonalSetting}
            />
            <Route
              path="/home/personal-settings/base"
              component={PersonalSetting}
              exact
            />
            <Route
              path="/home/personal-settings/security"
              component={PersonalSetting}
              exact
            />
            <Route
              exact
              path="/home/404"
              key="/home/404"
              component={ErrorPage}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
