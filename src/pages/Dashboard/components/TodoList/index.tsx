import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Empty } from 'antd';

interface TodoItem {
  id: number;
  level: string;
  content: string;
  isCompleted: boolean;
}

const { Text } = Typography;

const TodoList: React.FC<any> = (props: any) => {
  const [list] = useState<Array<TodoItem>>([]);
  const [loading] = useState(false);

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

  return (
    <div>
      <Card
        title="待办事项"
        style={{ padding: 0, marginBottom: 24 }}
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
    </div>
  );
};

export default TodoList;
