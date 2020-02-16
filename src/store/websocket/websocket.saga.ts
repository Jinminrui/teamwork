import { takeEvery } from 'redux-saga/effects';

import { CONNECT_WEBSOCKET, DISCONNECT_WEBSOCKET } from './actionTypes';

/* eslint-disable import/no-mutable-exports */
export let ws: WebSocket | null = null;

async function init() {
  if (typeof WebSocket === 'undefined') {
    window.alert('您的浏览器不支持WebSocket');
  }

  const url = 'ws://localhost:8081/message/efa5a42313ca4f3b9570e9a1c95871bd';
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
    console.log(`服务端消息：${msg.data}`);
    // 发现消息进入    开始处理前端触发逻辑
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

function sendMessage() {}

export default function* watchWebSocket() {
  yield takeEvery(CONNECT_WEBSOCKET, connect);
  yield takeEvery(DISCONNECT_WEBSOCKET, disconnect);
}
