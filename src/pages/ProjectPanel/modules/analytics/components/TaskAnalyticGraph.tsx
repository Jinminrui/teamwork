import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { analyseTask } from 'api/task';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const TaskAnalyticGraph: React.FC<RouteComponentProps> = props => {
  const projectId = (props.match.params as any).id;
  const { DataView } = DataSet;
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    analyseTask(projectId).then((res: any) => {
      setGraphData(res.data);
    });
  }, [projectId]);

  useEffect(() => {
    const dv = new DataView();
    dv.source(graphData).transform({
      type: 'percent',
      field: 'taskNum',
      dimension: 'executor',
      as: 'percent',
    });

    if (dv.rows.length) {
      const chart = new Chart({
        container: 'graph',
        autoFit: true,
        height: 300,
      });

      chart.data(dv.rows);

      chart.coordinate('theta', {
        radius: 0.75,
      });

      chart.scale('percent', {
        formatter: val => `${(val * 100).toFixed(1)}%`,
        alias: '占比',
      });

      chart.scale('taskNum', {
        alias: '任务数',
      });

      chart.tooltip({
        showTitle: true,
        showMarkers: false,
        title: 'executor',
      });

      chart
        .interval()
        .position('percent')
        .color('executor')
        .label('percent', {
          content: data => `${data.executor}: ${(data.percent * 100).toFixed(1)}%`,
        })
        .adjust('stack')
        .tooltip('taskNum*percent');

      chart.render();
    }
  }, [graphData, DataView]);

  return (
    <Card title="任务按执行者分布" style={{ marginBottom: 24 }}>
      <div id="graph" />
    </Card>
  );
};

export default withRouter(TaskAnalyticGraph);
