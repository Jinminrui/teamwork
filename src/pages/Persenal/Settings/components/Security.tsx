import React from 'react';
import { List, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';

const Security = () => {
  const { phone, hasPassword } = useSelector((store: Store) => store.user);
  return (
    <div>
      <div className="setting-title">安全设置</div>
      <List>
        <List.Item
          extra={
            hasPassword ? (
              <Button type="link">修改</Button>
            ) : (
              <Button type="link">设置密码</Button>
            )
          }
        >
          <List.Item.Meta
            title="账户密码"
            description={
              hasPassword ? (
                <span>当前密码强度：</span>
              ) : (
                <span>尚未设置密码</span>
              )
            }
          />
        </List.Item>
        <List.Item extra={<Button type="link">修改</Button>}>
          <List.Item.Meta
            title="手机绑定"
            description={<span>已绑定手机：{phone}</span>}
          />
        </List.Item>
      </List>
    </div>
  );
};

export default Security;
