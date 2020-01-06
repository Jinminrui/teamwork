import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Modal,
  Input,
  Select,
  Form,
  List,
  Typography,
  Empty,
} from 'antd';

interface TodoItem {
  id: number;
  level: string;
  content: string;
  isCompleted: boolean;
}

const { Option } = Select;
const { create } = Form;
const { Text } = Typography;

const TodoList: React.FC<any> = (props: any) => {
  const [list, setList] = useState<Array<TodoItem>>([]);
  const [loading] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);
  const [addingStatus, setAddingStatus] = useState(false);
  const { getFieldDecorator, getFieldValue, resetFields } = props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const levelColor: Map<string, string> = new Map([
    ['first', '#fa541c'],
    ['second', '#faad14'],
    ['third', '#a0d911'],
  ]);

  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   setList([
    //     {
    //       id: 1,
    //       level: 'first',
    //       content: '完成毕业设计的架构设计',
    //       isCompleted: false,
    //     },
    //     {
    //       id: 2,
    //       level: 'second',
    //       content: '完成毕业设计的后端开发',
    //       isCompleted: false,
    //     },
    //     {
    //       id: 3,
    //       level: 'third',
    //       content: '完成毕业设计的前端开发',
    //       isCompleted: false,
    //     },
    //   ]);
    //   setLoading(false);
    // }, 3000);
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
      const newItem: TodoItem = { id: 4, level, content, isCompleted: false };
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
        {list.length ? (
          <List
            dataSource={list}
            size="small"
            split={false}
            renderItem={(item, index) => (
              <List.Item>
                <Text
                  delete={item.isCompleted}
                  style={{ color: levelColor.get(item.level) }}
                >
                  {item.content}
                </Text>
              </List.Item>
            )}
          />
        ) : (
          <Empty description="暂无待办工作" />
        )}
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
