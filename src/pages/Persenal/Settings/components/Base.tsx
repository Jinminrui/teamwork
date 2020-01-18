import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Input, Upload, Button, Form, message } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { UserState } from 'store/user/user.reducer';
import { update } from 'api/user';

const Base = (props: any) => {
  const {
    pkId,
    username,
    position,
    email,
    phone,
    description,
    avatar,
    wxName,
  }: UserState = useSelector((store: Store) => store.user);
  const [currUsername, setCurrUsername] = useState(username);
  const [currPosition, setCurrPosition] = useState(position);
  const [currEmail, setCurrEmail] = useState(email);
  const [currPhone, setCurrPhone] = useState(phone);
  const [currDescription, setCurrDescription] = useState(description);
  const [currAvatar, setCurrAvatar] = useState(avatar);
  const [currWxName, setCurrWxName] = useState(wxName);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const mapKeyToMethod = new Map<string, Function | undefined>([
    ['username', setCurrUsername],
    ['position', setCurrPosition],
    ['email', setCurrEmail],
    ['phone', setCurrPhone],
    ['description', setCurrDescription],
    ['avatar', setCurrAvatar],
    ['wxName', setCurrWxName],
  ]);

  useEffect(() => {
    const userInfo: UserState = {
      username,
      position,
      email,
      phone,
      description,
      avatar,
      wxName,
    };
    const keys = Object.keys(userInfo);
    keys.forEach(item => {
      const fn = mapKeyToMethod.get(item);
      if (fn) {
        fn(userInfo[item]);
      }
    });
    // eslint-disable-next-line
  }, [pkId]);

  function handleFormItemChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    const fn = mapKeyToMethod.get(id);
    if (fn) {
      fn(value);
    }
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function handleChange(info: any) {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setCurrAvatar(info.file.response.data);
      message.success('上传成功');
      setUploadLoading(false);
    }
    setUploadLoading(false);
  }

  function canUpdate() {
    return (
      username !== currUsername ||
      position !== currPosition ||
      email !== currEmail ||
      phone !== currPhone ||
      description !== currDescription ||
      avatar !== currAvatar ||
      wxName !== currWxName
    );
  }

  function handleUpdate() {
    const params: any = {
      pkId,
      username: currUsername,
      email: currEmail,
      phone: currPhone,
      position: currPosition,
      description: currDescription,
      avatar: currAvatar,
      wxName: currWxName,
    };
    setUpdateLoading(true);
    update(params).then((res: any) => {
      if (res.code === 200) {
        message.success('更新成功');
      } else {
        message.error('更新失败');
      }
      setUpdateLoading(false);
      window.location.reload();
    });
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
                value={currUsername}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="职位">
              <Input
                id="position"
                value={currPosition}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="邮箱">
              <Input
                id="email"
                value={currEmail}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="手机号">
              <Input
                id="phone"
                value={currPhone}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="微信号">
              <Input
                id="wxName"
                value={currWxName}
                onChange={handleFormItemChange}
              />
            </Form.Item>
            <Form.Item label="个人简介">
              <Input.TextArea
                id="description"
                value={currDescription}
                onChange={handleFormItemChange}
                rows={4}
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            disabled={!canUpdate()}
            loading={updateLoading}
            onClick={handleUpdate}
          >
            更新信息
          </Button>
        </div>
        <div className="avatar-setting">
          <div className="avatar-setting-title">头像</div>
          <div className="avatar-setting-view">
            <Avatar src={currAvatar} size={144} />
            <Upload
              className="upload-btn"
              showUploadList={false}
              action="http://localhost:8081/oss/uploadAvatar"
              // customRequest={uploadRequest}
              data={{ userId: pkId }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <Button loading={uploadLoading}>
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
