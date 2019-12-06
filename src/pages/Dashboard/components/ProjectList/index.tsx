import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ProjectItem from './item';

const { Grid } = Card;

const ProjectList: React.FC = () => {
  const [list, setList] = useState<Array<number>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setList([1, 2, 3, 4, 5, 6]);
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Card
      title="进行中的项目"
      extra={<Link to="/project">全部项目</Link>}
      style={{ padding: 0, marginBottom: 24 }}
      loading={loading}
    >
      {list.map(item => (
        <Grid key={item} className="dashbord-project-list-gird">
          <ProjectItem key={item} />
        </Grid>
      ))}
    </Card>
  );
};

export default ProjectList;
