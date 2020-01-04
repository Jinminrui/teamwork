import React from 'react';
import { List, Button } from 'antd';

const Security = () => (
  <div>
    <div className="setting-title">安全设置</div>
    <List>
      <List.Item extra={<Button type="link">修改</Button>}>
        <List.Item.Meta
          title="账户密码"
          description={<span>当前密码强度：</span>}
        />
      </List.Item>
      <List.Item extra={<Button type="link">修改</Button>}>
        <List.Item.Meta
          title="手机绑定"
          description={<span>已绑定手机：173****6003</span>}
        />
      </List.Item>
      <List.Item extra={<Button type="link">修改</Button>}>
        <List.Item.Meta
          title="邮箱绑定"
          description={<span>已绑定邮箱：969******@qq.com</span>}
        />
      </List.Item>
    </List>
  </div>
);

export default Security;
