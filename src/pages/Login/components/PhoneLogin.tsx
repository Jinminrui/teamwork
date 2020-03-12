import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { useInterval } from 'utils/hooks';
import { getVerifyCode, loginByPhone } from 'api/user';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/user/user.action';

const PhoneLogin: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeGetable, setCodeGetable] = useState(true);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  const { history } = props;

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

  const handleLogin = () => {
    if (phone && code) {
      loginByPhone({ phoneNum: phone, code }).then((res: any) => {
        if (res.code === 200 && res.data) {
          Cookies.set('user-token', res.data.token.token);
          localStorage.setItem('userId', res.data.user.pkId);
          dispatch(setUserInfo({ id: res.data.user.pkId }));
          message.success('登录成功');
          history.push('/home/dashboard');
        } else {
          message.error(res.desc);
        }
      });
    }
  };

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
    if (phone) {
      getVerifyCode({ phoneNum: phone }).then((res: any) => {
        if (res.code === 200) {
          message.success('验证码已发送');
        }
      });
    } else {
      message.warn('请填写手机号');
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <p className="app-name"> Let&apos;s Work Together</p>
        <p className="title">验证手机以开始</p>
        <div className="input-wrapper">
          <Input
            placeholder="请输入手机号"
            prefix={<UserOutlined />}
            className="account-input"
            onChange={handlePhoneChange}
            value={phone}
          />
        </div>
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
          <Button type="link" style={{ float: 'right' }} onClick={handleLogin}>
            <Link to="/login/account">账号密码登录</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
