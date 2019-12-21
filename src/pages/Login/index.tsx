import React, { useState } from 'react';
import { Input, Icon, Button, message } from 'antd';
import './index.scss';
import { RouteComponentProps } from 'react-router-dom';
import { login } from 'api/user';
import Cookies from 'js-cookie';
import logo from './co-work.svg';

interface Props extends RouteComponentProps {
  children?: React.ReactNode;
}

const Login: React.FC<Props> = (props: Props) => {
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
    <div className="container">
      <div className="left-wrapper">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="right-wrapper">
        <div className="form-wrapper">
          <p className="app-name">Team-Work Platform</p>
          <p className="title">登录以开始使用</p>
          <Input
            placeholder="手机号或者邮箱"
            prefix={<Icon type="user" />}
            className="account-input"
            onChange={handleAccountChange}
            value={account}
          />
          <Input
            placeholder="密码"
            className="pwd-input"
            prefix={<Icon type="lock" />}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="primary" className="btn-start" onClick={handleLogin}>
            即刻开始
          </Button>
          <div className="bottom-link">
            <Button type="link" style={{ marginRight: 10 }}>
              忘记密码
            </Button>
            <Button type="link">注册</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
