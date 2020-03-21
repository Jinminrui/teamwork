import React, { useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Story = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="story-panel-container">
      <div className="story-sider-container">
        <Sider
          style={{ height: '100%' }}
          theme="light"
          width={298}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
        >
          <div className="story-classify-container">
            <div className="title">需求分类</div>
          </div>
        </Sider>
        <div className="trigger-container" style={{ left: !collapsed ? 298 : 0 }}>
          <div className="border-line" />
          <div className="trigger" onClick={() => { setCollapsed(!collapsed); }}>
            {!collapsed && <LeftOutlined />}
            {collapsed && <RightOutlined />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Story;
