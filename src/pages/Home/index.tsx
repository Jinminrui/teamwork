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
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Modal,
  Form,
  Input,
  message,
  Tooltip,
} from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import IconFont from 'components/IconFont';
import Dashboard from 'pages/Dashboard';
import PersonalInfo from 'pages/Persenal/Info';
import PersonalSetting from 'pages/Persenal/Settings';
import TeamInfo from 'pages/Team/TeamInfo';
import Docs from 'pages/Team/docs';

import { logout, update } from 'api/user';
import { Store } from 'types';
import { setScreenWidth } from 'store/app/app.action';
import './index.scss';
import { connectWebsocket } from 'store/message/message.action';
import { GET_REVEIVED_MESSAGE_LIST_SAGE } from 'store/message/actionTypes';
import InviteModal from 'components/InviteModal';

import DocDetail from 'pages/Team/docs/components/DocDetail';
import Logo from './logo.svg';
import MessageOverlay from './components/MessageOverlay';

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
  const [updateInfoFormVisible, setUpdateInfoFormVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const userInfo = useSelector((store: Store) => store.user);
  const team = useSelector((store: Store) => store.team);
  const messageInfo = useSelector((store: Store) => store.message);
  const dispatch = useDispatch();

  window.onresize = throttle(() => {
    dispatch(setScreenWidth(window.document.documentElement.getBoundingClientRect().width));
  }, 1000);


  useEffect(() => {
    dispatch({ type: 'SET_USER_INFO_SAGA' });
    dispatch(connectWebsocket());
    // return () => {
    //   dispatch(disconnect());
    // };
  }, [dispatch]);

  useEffect(() => {
    if (userInfo.pkId) {
      dispatch({
        type: GET_REVEIVED_MESSAGE_LIST_SAGE,
        data: { receiverId: userInfo.pkId, pageSize: 0, pageNum: 0 },
      });
    }
  }, [dispatch, userInfo.pkId]);

  useEffect(() => {
    if (team.teamId) {
      dispatch({ type: 'SET_MEMBER_LIST_SAGA', teamId: team.teamId });
    }
  }, [team.teamId, dispatch]);

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
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="2" onClick={handleGotoPersonalSetting}>
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const [form] = Form.useForm();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!userInfo.username && (
        <Modal
          title="请完善个人信息"
          visible={updateInfoFormVisible}
          closable={false}
          maskClosable={false}
          okText="确定"
          cancelText="取消"
          onOk={() => {
            form.validateFields().then(value => {
              update({ ...value, pkId: userInfo.pkId }).then((res: any) => {
                if (res.code === 200) {
                  message.success('更新成功');
                  dispatch({ type: 'SET_USER_INFO_SAGA' });
                  setUpdateInfoFormVisible(false);
                }
              });
            });
          }}
        >
          <Form form={form} layout="vertical" name="update-info">
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请填写用户名' }]}
            >
              <Input placeholder="请完善用户名" />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {team.teamId && (
        <InviteModal
          teamId={team.teamId}
          visible={inviteModalVisible}
          onOk={() => {
            setInviteModalVisible(false);
          }}
          onCancel={() => {
            setInviteModalVisible(false);
          }}
        />
      )}

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
            <Menu.Item key="team-docs" disabled={!team.teamId}>
              <FolderOutlined />
              <span>团队文档</span>
            </Menu.Item>
            <Menu.Item key="weekly-report" disabled={!team.teamId}>
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
            <Dropdown
              overlay={<MessageOverlay list={messageInfo.list} />}
              overlayClassName="message-overlay-container"
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="header-actions">
                <Badge count={messageInfo?.notRead}>
                  <IconFont style={{ fontSize: '20px' }} type="icon-tongzhi" />
                </Badge>
              </div>
            </Dropdown>
            <Tooltip placement="bottom" title="邀请团队成员">
              <div
                className="header-actions"
                onClick={() => {
                  if (team.teamId) {
                    setInviteModalVisible(true);
                  } else {
                    message.warn('您尚未拥有团队，请先创建或加入');
                  }
                }}
              >
                <UserAddOutlined
                  style={{ fontSize: '20px', color: '#595959' }}
                />
              </div>
            </Tooltip>
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
              path="/home/team-info"
              key="/home/team-info"
              component={TeamInfo}
            />
            <Route
              exact
              path="/home/team-docs"
              key="/home/team-docs"
              component={Docs}
            />
            <Route
              path="/home/doc-detail"
              key="/home/doc-detail"
              component={DocDetail}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
