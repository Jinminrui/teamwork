import React from 'react';
import { Modal, Input, Form } from 'antd';

export interface Values {
  name: string;
  description: string;
  creatorId: string;
}

interface FormModalProps {
  title: string;
  initialValues: any;
  visible: boolean;
  onOk: (values: Values) => void;
  onCancel: () => void;
}

const TeamInfoFormModal: React.FC<FormModalProps> = ({
  title,
  initialValues,
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={title}
      visible={visible}
      okText="确认"
      cancelText="取消"
      onOk={() => {
        form.validateFields().then((values: any) => {
          onOk(values);
          form.resetFields();
        });
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_team_form"
        initialValues={{
          name: initialValues.name,
          description: initialValues.description,
        }}
      >
        <Form.Item
          name="name"
          label="团队名称"
          rules={[
            {
              required: true,
              message: '请填写团队名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="团队介绍">
          <Input.TextArea rows={4} placeholder="请简单介绍一下您的团队" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeamInfoFormModal;
