import React, { useState } from 'react';
import { Popconfirm, Button, Avatar, Tag, List, message } from 'antd';
import { MessageFilled, PhoneOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from 'store/user/user.reducer';
import { deleteMember } from 'api/team';
import { Store } from 'types';
import MessageModal from 'components/MessageModal';

interface MemberListProps {
  isTeamCreator: boolean;
  myId: string;
  teamId: string;
}

const MemberList: React.FC<MemberListProps> = ({
  teamId,
  myId,
  isTeamCreator,
}) => {
  const memberList = useSelector((store: Store) => store.team?.memberList);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const dispatch = useDispatch();
  function handleDeleteMember(item: UserState) {
    if (teamId && item.pkId) {
      deleteMember({ teamId, userId: item.pkId }).then((res: any) => {
        message.success(res.desc);
        dispatch({ type: 'SET_MEMBER_LIST_SAGA', teamId });
      });
    }
  }

  return (
    <div>
      <List
        dataSource={memberList}
        renderItem={item => (
          <List.Item
            actions={[
              isTeamCreator && item.pkId !== myId && (
                <Popconfirm
                  title="您确定要移除该成员吗？"
                  onConfirm={() => {
                    handleDeleteMember(item);
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button danger size="small">
                    移除
                  </Button>
                </Popconfirm>
              ),
            ]}
          >
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
                <div style={{ paddingTop: 3 }}>
                  <PhoneOutlined />
                  <span style={{ marginLeft: 6 }}>{item.phone}</span>
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
      />
    </div>
  );
};

export default MemberList;
