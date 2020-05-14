import React, { useState } from 'react';
import { Layout } from 'antd';
import { LeftOutlined, RightOutlined, MenuFoldOutlined } from '@ant-design/icons';
import KanBan from 'components/Kanban';
import { RouteComponentProps } from 'react-router-dom';
import ClassifyTree from '../story/components/ClassifyTree';

const { Sider, Content } = Layout;

const Bug = (props: RouteComponentProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState<any>({ pkId: undefined, name: '所有缺陷' });

  const projectId = (props.match.params as any).id;
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
            <div className="title">缺陷分类</div>
            <ClassifyTree
              current={current}
              setCurrent={key => {
                setCurrent(key);
              }}
              type={2}
              projectId={projectId}
            />
          </div>
        </Sider>
        <div
          className="trigger-container"
          style={{ left: !collapsed ? 298 : 0 }}
        >
          <div className="border-line" />
          <div
            className="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {!collapsed && <LeftOutlined />}
            {collapsed && <RightOutlined />}
          </div>
        </div>
      </div>
      <Content style={{ paddingTop: 10, paddingLeft: 24, paddingRight: 24, background: '#f6f6f6' }} className="panel-layout">
        <div className="story-content-container">
          <div className="story-class-header">
            <div className="story-class-title">
              <MenuFoldOutlined style={{ marginRight: 8 }} />{current.name}
            </div>
          </div>
          <KanBan type={2} taskClass={current} projectId={projectId} />
        </div>
      </Content>
    </Layout>
  );
};

export default Bug;
