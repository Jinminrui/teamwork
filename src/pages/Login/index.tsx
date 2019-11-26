import React, { useState } from 'react';
import { Input, Icon, Button } from 'antd';
import './index.scss';
import logo from './co-work.svg';

const Login: React.FC<any> = props => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  console.log(props);

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
      localStorage.setItem('user_token', account + password);
      history.push('/home');
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
