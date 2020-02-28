/* eslint-disable no-alert */
/* eslint-disable no-console */
import { takeEvery, put } from 'redux-saga/effects';
import { notification } from 'antd';
import store from 'store';
import { getMessageListByReceiver } from 'api/message';
import { setReceivedMessageList } from './message.action';
import {
  CONNECT_WEBSOCKET,
  DISCONNECT_WEBSOCKET,
  SEND_MESSAGE,
  GET_REVEIVED_MESSAGE_LIST_SAGE,
} from './actionTypes';

/* eslint-disable import/no-mutable-exports */
export let ws: WebSocket | null = null;

async function init() {
  if (typeof WebSocket === 'undefined') {
    window.alert('您的浏览器不支持WebSocket');
  }

  const userId = localStorage.getItem('userId');
  const env = process.env.NODE_ENV;
  let HOST = '';
  if (env === 'development') {
    HOST = 'localhost:8081';
  } else if (env === 'production') {
    HOST = '47.100.221.250:8081';
  }

  const url = `ws://${HOST}/message/${userId}`;

  if (ws !== null) {
    ws.close();
    ws = null;
  }
  ws = new WebSocket(url);

  // 打开事件
  ws.onopen = () => {
    console.log('websocket已打开');
    // socket.send("这是来自客户端的消息" + location.href + new Date());
  };
  // 获得消息事件
  ws.onmessage = msg => {
    let data;
    try {
      data = JSON.parse(msg.data);
      console.log(data);
      const senderName = data.senderId;
      store.dispatch({
        type: GET_REVEIVED_MESSAGE_LIST_SAGE,
        data: {
          receiverId: localStorage.getItem('userId'),
          pageNum: 0,
          pageSize: 0,
        },
      });
      notification.info({
        key: data.messageId,
        message: `收到来自${senderName}的一条消息`,
        description: data.title,
      });
    } catch (error) {
      console.log(msg.data);
    }
  };
  // 关闭事件
  ws.onclose = () => {
    console.log('websocket已关闭');
  };
  // 发生了错误事件
  ws.onerror = () => {
    console.log('websocket发生了错误');
  };
}

function connect() {
  init();
}

function disconnect() {
  // 为什么要使用while呢,因为我们的页面上有可能不只 创建了一个websocket连接
  while (ws) {
    ws.close(1000);
  }
}

function sendMessage(action: any) {
  if (ws) {
    ws.send(JSON.stringify(action.data));
  }
}

function* getMessageListSaga(action: any) {
  const { receiverId, pageSize, pageNum } = action.data;
  const res = yield getMessageListByReceiver(receiverId, pageSize, pageNum);
  yield put(setReceivedMessageList(res.data));
}

export default function* watchWebSocket() {
  yield takeEvery(CONNECT_WEBSOCKET, connect);
  yield takeEvery(DISCONNECT_WEBSOCKET, disconnect);
  yield takeEvery(SEND_MESSAGE, sendMessage);
  yield takeEvery(GET_REVEIVED_MESSAGE_LIST_SAGE, getMessageListSaga);
}
