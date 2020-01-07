import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useInterval } from 'utils/hooks';

const PhoneLogin: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeGetable, setCodeGetable] = useState(true);
  const [time, setTime] = useState(0);

  const handlePhoneChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhone(e.target.value);
  };

  const handleCodeChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCode(e.target.value);
  };

  const handleLogin = () => {};

  useInterval(() => {
    if (time <= 0) {
      setCodeGetable(true);
    } else {
      setTime(time - 1);
    }
  });

  const handleGetVerifyCode = () => {
    setTime(60);
    setCodeGetable(false);
  };

  return (
    <div>
      <div className="form-wrapper">
        <p className="app-name">Team-Work Platform</p>
        <p className="title">验证手机以开始</p>
        <Input
          placeholder="请输入手机号"
          prefix={<UserOutlined />}
          className="account-input"
          onChange={handlePhoneChange}
          value={phone}
        />
        <div className="verifyCode">
          <Input
            placeholder="验证码"
            className="verifyCode-input"
            onChange={handleCodeChange}
            value={code}
          />
          <Button
            className="verifyCode-btn"
            onClick={handleGetVerifyCode}
            disabled={!codeGetable}
          >
            {codeGetable ? '获取验证码' : `${time}s后再次获取`}
          </Button>
        </div>
        <Button
          type="primary"
          className="btn-start"
          disabled={!phone || !code}
          onClick={handleLogin}
        >
          即刻开始
        </Button>
        <div className="bottom-link">
          <Button type="link" style={{ float: 'right' }}>
            <Link to="/login/account">账号密码登录</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
