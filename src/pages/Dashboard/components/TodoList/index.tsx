import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Modal, Input, Select, Form } from 'antd';

interface TodoItem {
  level: string;
  content: string;
}

const { Option } = Select;
const { create } = Form;

const TodoList: React.FC<any> = (props: any) => {
  const [list, setList] = useState<Array<TodoItem>>([]);
  const [loading, setLoading] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);
  const [addingStatus, setAddingStatus] = useState(false);
  const { getFieldDecorator, getFieldValue, resetFields } = props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const levelColor: Map<string, string> = new Map([
    ['first', 'red'],
    ['second', 'orange'],
    ['third', 'cyan'],
  ]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setList([
        {
          level: 'first',
          content: '完成毕业设计的架构设计',
        },
        {
          level: 'second',
          content: '完成毕业设计的后端开发',
        },
        {
          level: 'third',
          content: '完成毕业设计的前端开发',
        },
      ]);
      setLoading(false);
    }, 3000);
  }, []);

  function handleAddTodoItem(): void {
    setModelVisible(true);
  }

  function handleCancel(): void {
    setModelVisible(false);
  }

  function handleOk() {
    setAddingStatus(true);
    setTimeout(() => {
      const level = getFieldValue('level');
      const content = getFieldValue('content');
      const newItem: TodoItem = { level, content };
      setList([...list, newItem]);
      setAddingStatus(false);
      setModelVisible(false);
      resetFields();
    }, 1000);
  }

  return (
    <div>
      <Card
        title="待办事项"
        style={{ padding: 0, marginBottom: 24 }}
        extra={
          <Button type="link" onClick={handleAddTodoItem}>
            添加
          </Button>
        }
        loading={loading}
      >
        {list.map((item: TodoItem) => (
          <Tag
            key={item.content}
            closable
            color={levelColor.get(item.level)}
            style={{ margin: 6 }}
          >
            {item.content}
          </Tag>
        ))}
      </Card>
      <Modal
        title="添加待办事项"
        visible={modelVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={addingStatus}
            onClick={handleOk}
          >
            确定
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Form.Item label="紧急程度" {...formItemLayout}>
            {getFieldDecorator('level', {
              rules: [
                {
                  required: true,
                  message: '请选择紧急程度',
                },
              ],
            })(
              <Select
                placeholder="请选择紧急程度"
                style={{ width: 160, marginBottom: 10 }}
              >
                <Option value="first">紧急</Option>
                <Option value="second">一般</Option>
                <Option value="third">次要</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="具体内容" {...formItemLayout}>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入待办事项内容',
                },
              ],
            })(<Input placeholder="请输入待办事项" />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default create()(TodoList);
