import React, { useState } from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Switch, Route, Redirect } from 'react-router-dom';

import './index.scss';
import IconFont from 'components/IconFont';
import Dashboard from 'pages/Dashboard';
import PersonalInfo from 'pages/Persenal/Info';

import Logo from './logo.svg';

const { Header, Sider, Content } = Layout;
const { Item, ItemGroup } = Menu;

const Home: React.FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuVisiable, setUserMenuVisiable] = useState(false);
  const [marginLeft, setMarginLeft] = useState(256);
  const [headerMarginLeft, setHeaderMarginLeft] = useState(
    'calc(100% - 256px)'
  );

  const { pathname } = props.location;
  const currentKey = pathname.split('/')[2];

  function toggle(): void {
    setCollapsed(!collapsed);
    setMarginLeft(collapsed ? 256 : 80);
    setHeaderMarginLeft(collapsed ? 'calc(100% - 256px)' : 'calc(100% - 80px)');
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
  }

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">个人设置</Menu.Item>
      <Menu.Item key="3">切换团队</Menu.Item>
      <Menu.Item key="4">退出登录</Menu.Item>
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
          defaultSelectedKeys={[`${currentKey}`]}
          onClick={handleMenuItemClick}
          style={{ padding: '16px 0px', width: '100%' }}
        >
          <Menu.Item key="dashboard">
            <Icon type="dashboard" />
            <span>首页-工作台</span>
          </Menu.Item>
          <ItemGroup key="persenal" title="个人中心">
            <Item key="personal-info">
              <Icon type="user" />
              <span>个人信息</span>
            </Item>
            <Item key="personal-settings">
              <Icon type="setting" />
              <span>个人设置</span>
            </Item>
          </ItemGroup>
          <ItemGroup key="team" title="团队建设">
            <Menu.Item key="team-info">
              <Icon type="team" />
              <span>基础信息</span>
            </Menu.Item>
            <Menu.Item key="team-doc">
              <Icon type="folder" />
              <span>团队文档</span>
            </Menu.Item>
            <Menu.Item key="weekly-report">
              <Icon type="calendar" />
              <span>成员周报</span>
            </Menu.Item>
          </ItemGroup>

          <ItemGroup key="project" title="项目中心">
            <Menu.Item key="project-list">
              <Icon type="project" />
              <span>项目列表</span>
            </Menu.Item>
            <Menu.Item key="project-analyze">
              <Icon type="line-chart" />
              <span>项目统计</span>
            </Menu.Item>
          </ItemGroup>

          <ItemGroup key="other" title="其他功能">
            <Menu.Item key="mystart">
              <Icon type="star" />
              <span>我的收藏</span>
            </Menu.Item>
            <Menu.Item key="">
              <Icon type="delete" />
              <span>回收站</span>
            </Menu.Item>
          </ItemGroup>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft }}>
        <Header className="header" style={{ width: headerMarginLeft }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />

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
                <Avatar
                  style={{
                    backgroundColor: 'orange',
                    verticalAlign: 'middle',
                  }}
                >
                  KK
                </Avatar>
                <span className="username">Keen King</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="content-wrapper"
          style={{
            padding: '0 50px',
            marginLeft: 16,
            marginRight: 16,
            background: '#fff',
            marginTop: 84,
          }}
        >
          <Switch>
            <Route
              exact
              path="/home"
              component={() => <Redirect to="/home/dashboard" />}
            />
            <Route exact path="/home/dashboard" component={Dashboard} />
            <Route exact path="/home/personal-info" component={PersonalInfo} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
