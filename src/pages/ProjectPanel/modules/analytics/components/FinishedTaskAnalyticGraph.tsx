import React, { useState, useEffect } from 'react';
import { analyseFinishedTaskByMember } from 'api/task';
import { Card } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Chart } from '@antv/g2';
import { height } from '../graphConfig';

const FinishedTaskAnalyticGraph: React.FC<RouteComponentProps> = props => {
  const projectId = (props.match.params as any).id;
  const [graphData, setGraphData] = useState<any>([]);
  useEffect(() => {
    analyseFinishedTaskByMember(projectId).then((res: any) => {
      setGraphData(res.data);
    });
  }, [projectId]);

  useEffect(() => {
    if (graphData.length) {
      const chart = new Chart({
        container: 'graph2',
        autoFit: true,
        height,
      });
      chart.data(graphData);

      chart.scale('taskNum', {
        alias: '任务数',
      });
      chart.tooltip({
        showMarkers: false,
      });
      chart.interval().position('executor*taskNum').adjust('stack');
      chart.interaction('element-active');
      chart.render();
    }
  }, [graphData]);

  return (
    <Card title="已完成的任务情况" style={{ marginBottom: 24 }}>
      <div id="graph2" />
    </Card>
  );
};

export default withRouter(FinishedTaskAnalyticGraph);
