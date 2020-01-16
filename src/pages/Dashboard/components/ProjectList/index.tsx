import React, { useState } from 'react';
import { Card, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { ProjectListItem } from 'types';
import ProjectItem from './item';

const { Grid } = Card;

const ProjectList: React.FC = () => {
  const [list] = useState<Array<ProjectListItem>>([]);
  // const [loading, setLoading] = useState(false);
  // const userId = useSelector((store: Store) => store.user.id);
  // useEffect(() => {
  //   setLoading(true);
  //   if (userId) {
  //     getProjectList({ userId }).then(res => {
  //       if (res.data) {
  //         setList(res.data.list.slice(0, 6));
  //       }
  //       setLoading(false);
  //     });
  //   }
  // }, [userId]);
  return (
    <Card
      title="进行中的项目"
      extra={<Link to="/project">全部项目</Link>}
      style={{ padding: 0, marginBottom: 24 }}
    >
      {list.length === 0 ? (
        <Empty description="尚未参加项目" />
      ) : (
        list.map(item => (
          <Grid key={item.id} className="dashbord-project-list-gird">
            <ProjectItem key={item.id} detail={item} />
          </Grid>
        ))
      )}
    </Card>
  );
};

export default ProjectList;
