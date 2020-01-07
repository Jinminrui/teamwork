import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { RouteComponentProps, Link } from 'react-router-dom';
import { login } from 'api/user';
import Cookies from 'js-cookie';

const AccountLogin: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const { history } = props;

  const handleAccountChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccount(e.target.value);
  };

  const handlePasswordChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (account && password) {
      login({ username: account, password }).then((res: any) => {
        if (res.code === 200) {
          Cookies.set('user-token', res.data.token);
          message.success('登录成功', 2);
          history.push('/home/dashboard');
        } else {
          message.error(res.desc, 2);
        }
      });
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <p className="app-name">Team-Work Platform</p>
        <p className="title">登录以开始使用</p>
        <Input
          placeholder="手机号或者邮箱"
          prefix={<UserOutlined />}
          className="account-input"
          onChange={handleAccountChange}
          value={account}
        />
        <Input.Password
          placeholder="密码"
          className="pwd-input"
          prefix={<LockOutlined />}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="primary"
          className="btn-start"
          disabled={!account || !password}
          onClick={handleLogin}
        >
          即刻开始
        </Button>
        <div className="bottom-link">
          <Button type="link" style={{ float: 'left' }}>
            <Link to="/login">验证码登录</Link>
          </Button>
          <Button type="link" style={{ float: 'right' }}>
            <Link to="/login">注册</Link>
          </Button>
          <Button type="link" style={{ marginRight: 10, float: 'right' }}>
            忘记密码
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountLogin;
