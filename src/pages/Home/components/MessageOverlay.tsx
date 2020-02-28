import React from 'react';
import { Tabs, Empty } from 'antd';
import { MessageItem } from 'store/message/message.reducer';
import MessageList from './MessageList';

const { TabPane } = Tabs;

interface Props {
  list: Array<MessageItem>;
  receiver: string;
}

const MessageOverlay = (props: Props) => {
  const { list, receiver } = props;
  const messageList = list.filter(item => item.type === 1);
  const noticeList = list.filter(item => item.type === 2);
  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="top"
      className="tab-list"
      animated={false}
    >
      <TabPane tab={messageList.length !== 0 ? `消息（${messageList.length}）` : '消息'} key="message">
        {messageList.length === 0 ? (
          <Empty
            className="no-result"
            image="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            description="您已读完所有消息"
          />
        ) : (
          <MessageList list={messageList} type="消息" receiver={receiver} />
        )}
      </TabPane>
      <TabPane tab={noticeList.length !== 0 ? `通知（${noticeList.length}}）` : '通知'} key="notice">
        {noticeList.length === 0 ? (
          <Empty
            className="no-result"
            image="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            description="您已查看所有通知"
          />
        ) : (
          <MessageList list={noticeList} type="通知" receiver={receiver} />
        )}
      </TabPane>
    </Tabs>
  );
};

export default MessageOverlay;
