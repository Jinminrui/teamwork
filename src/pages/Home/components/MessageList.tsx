/* eslint-disable import/no-unresolved */
import React from 'react';
import { List, Avatar, message } from 'antd';
import { MessageItem } from 'store/message/message.reducer';
import { deleteMessage, readOneMessage } from 'api/message';
import { GET_REVEIVED_MESSAGE_LIST_SAGE } from 'store/message/actionTypes';
import { useDispatch } from 'react-redux';

interface Props {
  list: Array<MessageItem>;
  type: string;
  receiver: string;
}

const MessageList = (props: Props) => {
  const { list, type, receiver } = props;

  const receiverId = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (receiverId) {
      let typeNum = 1;
      if (type === '消息') {
        typeNum = 1;
      }
      if (type === '通知') {
        typeNum = 2;
      }
      deleteMessage({ receiver, type: typeNum }).then((res: any) => {
        message.success(res.desc);
        dispatch({
          type: GET_REVEIVED_MESSAGE_LIST_SAGE,
          data: { receiverId, pageSize: 0, pageNum: 0 },
        });
      });
    }
  };

  const readIt = (item: MessageItem) => {
    if (!item.status) {
      readOneMessage(item.pkId).then(res => {
        dispatch({
          type: GET_REVEIVED_MESSAGE_LIST_SAGE,
          data: { receiverId, pageSize: 0, pageNum: 0 },
        });
      });
    }
  };

  return (
    <div>
      <div style={{ height: 400, overflow: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item: MessageItem) => (
            <List.Item
              className={`message-list-item ${item.status &&
                  'message-list-item-readed'}`}
              onClick={() => readIt(item)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={32}
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                  }
                title={
                  <span className="message-title">{`来自 ${item.senderId}`}</span>
                  }
                description={
                  <div>
                    <div className="message-desc">{item.title}</div>
                    <div className="sendtime">
                      {item.createTime.slice(0, -3)}
                    </div>
                  </div>
                  }
              />
            </List.Item>
          )}
        />
      </div>
      <div className="message-footer">
        <div onClick={handleDelete}>{`清空 ${type}`}</div>
        <div>查看更多</div>
      </div>
    </div>
  );
};

export default MessageList;
