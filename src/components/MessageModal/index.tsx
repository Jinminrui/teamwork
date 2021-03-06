import React, { useState } from 'react';
import { Modal, Form, Mentions, Input } from 'antd';
import { UserState } from 'store/user/user.reducer';
import { Message, MessageType, Receiver } from 'types';
import { useDispatch } from 'react-redux';
import { sendMessage } from 'store/message/message.action';

const { Option, getMentions } = Mentions;

interface MessageModalProps {
  title: string;
  visible: boolean;
  memberList: Array<UserState>;
  onCancel: () => void;
  onOk: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  title,
  visible,
  onCancel,
  onOk,
  memberList,
}) => {
  const [form] = Form.useForm();
  const [reveivers, setReveivers] = useState<Array<Receiver>>([]);

  const dispatch = useDispatch();

  const checkMention = async (rule: any, value: any, callback: any) => {
    const mentions = getMentions(value);

    if (mentions.length < 1) {
      throw new Error('More than one must be selected!');
    }
  };

  const handleMentionSelect = (option: any) => {
    const name = option.value;
    memberList.forEach(item => {
      if (item.username === name && item.pkId) {
        setReveivers([...reveivers, { id: item.pkId, username: name }]);
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setReveivers([]);
      }}
      onOk={() => {
        form.validateFields().then((values: any) => {
          const messageParams: Message = { ...values };
          messageParams.receivers = reveivers;
          messageParams.type = MessageType.NOTICE;
          dispatch(sendMessage(messageParams));
          form.resetFields();
          setReveivers([]);
          onOk();
        });
      }}
      okText="发送"
      cancelText="取消"
    >
      <Form form={form} layout="vertical" name="message_form">
        <Form.Item
          name="mentions"
          label="提及的成员"
          rules={[{ validator: checkMention }]}
        >
          <Mentions
            rows={1}
            placeholder="@您想提及的人"
            onSelect={handleMentionSelect}
          >
            {memberList.map(item => (
              <Option key={item.pkId} value={item.username || item.phone}>
                {item.username || item.phone}
              </Option>
            ))}
          </Mentions>
        </Form.Item>
        <Form.Item name="messageTitle" label="消息标题">
          <Input placeholder="请输入消息标题" />
        </Form.Item>
        <Form.Item name="messageContent" label="消息内容">
          <Input.TextArea rows={4} placeholder="请输入您的消息内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MessageModal;
