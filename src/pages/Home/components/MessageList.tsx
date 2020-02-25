import React from 'react';
import { List, Avatar } from 'antd';
import { MessageItem } from 'store/message/message.reducer';

interface Props {
  list: Array<MessageItem>;
  type: string;
}

const MessageList = (props: Props) => {
  const { list, type } = props;
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item: MessageItem) => (
          <List.Item className={`message-list-item ${item.status && 'message-list-item-readed'}`}>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={32}
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                />
            }
              title={<span className="message-title">{`来自 ${item.sender}`}</span>}
              description={
                <div>
                  <div className="message-desc">
                    {item.title}
                  </div>
                  <div className="sendtime">{item.sendTime.slice(0, -3)}</div>
                </div>
            }
            />
          </List.Item>
        )}
      />
      <div className="message-footer">
        <div>{`清空 ${type}`}</div>
        <div>查看更多</div>
      </div>
    </div>
  );
};

export default MessageList;
