import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Input, Upload, Button, Form } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';

const Base = (props: any) => {
  const userInfo = useSelector((store: Store) => store.user);
  const [username, setUsername] = useState(userInfo.username);
  const [position, setPosition] = useState(userInfo.position);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [description, setDescription] = useState(userInfo.description);
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);

  const mapKeyToMethod = new Map<string, Function | undefined>([
    ['username', setUsername],
    ['position', setPosition],
    ['email', setEmail],
    ['phone', setPhone],
    ['description', setDescription],
    ['avatarUrl', setAvatarUrl],
  ]);

  useEffect(() => {
    const keys = Object.keys(userInfo);
    keys.forEach(item => {
      const fn = mapKeyToMethod.get(item);
      if (fn) {
        fn(userInfo[item]);
      }
    });
  }, [userInfo, mapKeyToMethod]);

  function handleFormItemChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    const fn = mapKeyToMethod.get(id);
    if (fn) {
      fn(value);
    }
  }

  return (
    <div>
      <div className="setting-title">基本设置</div>
      <div className="base-setting-container">
        <div className="form-wrapper">
          <Form layout="vertical">
            <Form.Item label="用户名">
              <Input
                id="username"
                value={username}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="职位">
              <Input
                id="position"
                value={position}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="邮箱">
              <Input id="email" value={email} onChange={handleFormItemChange} />
            </Form.Item>
            <Form.Item label="手机号">
              <Input id="phone" value={phone} onChange={handleFormItemChange} />
            </Form.Item>
            <Form.Item label="个人简介">
              <Input.TextArea
                id="description"
                value={description}
                onChange={handleFormItemChange}
                rows={4}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="avatar-setting">
          <div className="avatar-setting-title">头像</div>
          <div className="avatar-setting-view">
            <Avatar src={avatarUrl} size={144} />
            <Upload className="upload-btn">
              <Button>
                <UploadOutlined /> 更换头像
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
