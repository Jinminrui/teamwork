import React, { useState } from 'react';
import { List, Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { update } from 'api/user';

const Security = () => {
  const { phone, pkId } = useSelector((store: Store) => store.user);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [pwdForm] = Form.useForm();
  return (
    <div>
      <div className="setting-title">安全设置</div>
      <List>
        <List.Item
          extra={
            <Button type="link" onClick={() => setPasswordModalVisible(true)}>
              设置密码
            </Button>
          }
        >
          <List.Item.Meta title="账户密码" />
        </List.Item>
        <List.Item extra={<Button type="link">修改</Button>}>
          <List.Item.Meta
            title="手机绑定"
            description={<span>已绑定手机：{phone}</span>}
          />
        </List.Item>
      </List>

      <Modal
        visible={passwordModalVisible}
        title="设置新密码"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setPasswordModalVisible(false);
          pwdForm.resetFields();
        }}
        onOk={() => {
          pwdForm.validateFields().then(value => {
            update({ pkId, password: value.password }).then(res => {
              message.success('设置成功');
              pwdForm.resetFields();
              setPasswordModalVisible(false);
            });
          });
        }}
      >
        <Form form={pwdForm} layout="vertical">
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="请输入新密码"></Input.Password>
          </Form.Item>
          <Form.Item
            name="surePassword"
            label="确认密码"
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认你的密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('两次输入的密码不一致，请重新输入！');
                },
              }),
            ]}
          >
            <Input.Password placeholder="再输入一次以确认密码"></Input.Password>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Security;
