import React from 'react';
import { Form, Modal, Input, message } from 'antd';
import { createTaskClass, updateTaskClass } from 'api/task';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getClassInfoSagaAction } from 'store/task/task.action';
import { useDispatch } from 'react-redux';

interface Props extends RouteComponentProps {
  projectId: string;
  type: number;
  visible: boolean;
  title: string;
  setVisibleFalse: () => void;
  initValues?: any;
  setInitDataUndefined: () => void;
}

const EditClassModal: React.FC<Props> = ({
  projectId,
  type,
  visible,
  title,
  setVisibleFalse,
  initValues,
  match,
  setInitDataUndefined,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleOk = () => {
    form.validateFields().then(value => {
      if (title === '创建需求分类') {
        createTaskClass({
          projectId: (match.params as any).id,
          type: 1,
          name: value.name,
          description: value.description,
        }).then(res => {
          message.success('创建成功');
          form.resetFields();
          setVisibleFalse();
          setInitDataUndefined();
          dispatch(getClassInfoSagaAction({ projectId, type }));
        });
      }
      if (title === '编辑需求分类') {
        updateTaskClass({
          pkId: initValues.pkId,
          name: value.name,
          description: value.description,
        }).then(res => {
          message.success('更新成功');
          form.resetFields();
          setVisibleFalse();
          setInitDataUndefined();
          dispatch(getClassInfoSagaAction({ projectId, type }));
        });
      }
    });
  };

  const handleCancel = () => {
    setInitDataUndefined();
    form.resetFields();
    setVisibleFalse();
  };


  return (
    <Modal
      title={title}
      visible={visible}
      okText={title === '创建需求分类' ? '立即创建' : '保存修改'}
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" initialValues={initValues}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入类别名称' }]}
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={4} placeholder="请输入..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default withRouter(EditClassModal);
