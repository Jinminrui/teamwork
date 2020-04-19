import React, { useState } from 'react';
import { Avatar, Tag, List } from 'antd';
import { MessageFilled, PhoneOutlined, MailOutlined, WechatOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import MessageModal from 'components/MessageModal';

interface MemberListProps {
  isTeamCreator: boolean;
  myId: string;
  teamId: string;
}

const MemberList: React.FC<MemberListProps> = () => {
  const memberList = useSelector((store: Store) => store.team?.memberList);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  return (
    <div>
      <List
        dataSource={memberList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size={64} />}
              title={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 16, marginRight: 8 }}>
                    {item.username || item.phone || ''}
                  </span>
                  {item.position && <Tag color="geekblue">{item.position}</Tag>}
                  <MessageFilled
                    style={{
                      fontSize: 18,
                      color: '#95de64',
                      cursor: 'pointer',
                      marginLeft: 12,
                    }}
                    onClick={() => {
                      setMessageModalVisible(true);
                    }}
                  />
                </div>
              }
              description={
                <div>
                  <div style={{ paddingTop: 3 }}>
                    <PhoneOutlined />
                    <span style={{ marginLeft: 6 }}>{item.phone}</span>
                  </div>

                  <div style={{ paddingTop: 3 }}>
                    <MailOutlined />
                    <span style={{ marginLeft: 6 }}>{item.email || '尚未设置'}</span>
                  </div>

                  <div style={{ paddingTop: 3 }}>
                    <WechatOutlined />
                    <span style={{ marginLeft: 6 }}>{item.wxName || '尚未设置'}</span>
                  </div>

                </div>
              }
            />
          </List.Item>
        )}
      />
      <MessageModal
        title="发送消息"
        visible={messageModalVisible}
        memberList={memberList}
        onCancel={() => {
          setMessageModalVisible(false);
        }}
        onOk={() => {
          setMessageModalVisible(false);
        }}
      />
    </div>
  );
};

export default MemberList;
