import React from 'react';
import { ProjectListItem } from 'types';
import { List, Card, Empty } from 'antd';
import workPng from './work.png';

interface Props {
  projectList: Array<ProjectListItem>;
}
const { Meta } = Card;
const ProjectList: React.FC<Props> = (props: Props) => {
  const { projectList } = props;
  if (!projectList.length) {
    return <Empty description="尚未参与项目" />;
  }
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
      }}
      dataSource={projectList}
      renderItem={item => (
        <List.Item key={item.id}>
          <Card cover={<img alt="example" src={workPng} />} hoverable>
            <Meta title={item.title} description={item.description} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ProjectList;
