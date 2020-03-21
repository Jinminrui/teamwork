import React, { useState, useEffect } from 'react';
import './index.scss';
import { List, Tooltip, Avatar } from 'antd';
import { BulbFilled, ProjectOutlined } from '@ant-design/icons';

interface Props {
  type: string;
}

const inindata: any = {
  id: 'BYSJ-1',
  name: '项目中心功能设计',
  status: '正在研发',
  project: '毕业设计',
  executor: {
    name: '金敏睿',
    avatar:
      'http://oss.jinminrui.cn/avatars/efa5a42313ca4f3b9570e9a1c95871bd/20200120122152.png',
  },
  type: '需求',
};

const TaskList = (props: Props) => {
  const { type } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const temp: any = [];
    for (let i = 0; i < 9; i += 1) {
      temp.push(inindata);
    }
    setList(temp);
  }, []);

  const getTitle = () => {
    if (type === 'myexe') {
      return '我执行的';
    }
    if (type === 'mycreate') {
      return '我创建的';
    }
    if (type === 'myjoin') {
      return '我参与的';
    }
  };
  return (
    <div className="task-list-container">
      <div className="header-bar">
        <div className="title">{getTitle()} · 9</div>
      </div>
      <div className="task-list">
        <List
          dataSource={list}
          renderItem={(item: any) => (
            <div className="list-item">
              <div className="detail">
                <div className="name">
                  {item.name}
                  <span className="task-id label">{item.id}</span>
                </div>
                <div className="task-infos">
                  <span className="status label">{item.status}</span>
                  <span className="type">
                    <BulbFilled style={{ color: '#52c41a', marginRight: 4 }} />
                    {item.type}
                  </span>
                  <span className="project">
                    <ProjectOutlined style={{ marginRight: 4 }} />
                    项目：{item.project}
                  </span>
                </div>
              </div>
              <div className="executor">
                <Tooltip title={item.executor.name}>
                  <Avatar size={24} src={item.executor.avatar} />
                </Tooltip>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TaskList;
