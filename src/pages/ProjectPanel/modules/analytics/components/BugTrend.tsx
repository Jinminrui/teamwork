import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, Select, Form } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';

import {
  AnalyseBugAccumulativeTrendParams,
  analyseBugAccumulativeTrend,
} from 'api/task';
import moment from 'moment';
import { Chart } from '@antv/g2';
import { height } from '../graphConfig';

const { Option } = Select;

const BugTrend: React.FC<RouteComponentProps> = props => {
  const projectId = (props.match.params as any).id;
  const { sprintList } = useSelector((store: Store) => store.task);
  const [interval, setInterval] = useState(7);
  const [sprintId, setSprintId] = useState('all');
  const [curChart, setChart] = useState<any>();

  useEffect(() => {
    const params: AnalyseBugAccumulativeTrendParams = {
      projectId,
      sprintId: sprintId === 'all' ? undefined : sprintId,
      interval,
    };

    analyseBugAccumulativeTrend(params).then(res => {
      if (!curChart) {
        const chart: Chart = new Chart({
          container: 'graph3',
          autoFit: true,
          height,
        });

        chart.tooltip({
          showCrosshairs: true,
          shared: true,
        });

        chart.scale('date', {
          formatter: val => moment(val).format('MM-DD'),
        });

        chart.scale('value', {
          min: 0,
          alias: '缺陷数',
        });

        chart.axis('value', {
          title: {},
        });

        chart
          .line()
          .position('date*value')
          .color('type')
          .shape('smooth');

        chart
          .point()
          .position('date*value')
          .color('type')
          .shape('circle')
          .size(2);
        chart.data(res.data);

        chart.render();

        setChart(chart);
      } else {
        curChart.changeData(res.data);
      }
    });
  }, [interval, sprintId, projectId, curChart]);


  const FilterForm = () => (
    <Form layout="inline">
      <Form.Item label="时间间隔" name="interval">
        <Select
          defaultValue={interval}
          value={interval}
          onChange={value => {
            setInterval(value);
          }}
        >
          <Option value={7}>过去七天</Option>
          <Option value={30}>过去一个月</Option>
        </Select>
      </Form.Item>
      {sprintList.length && (
        <Form.Item label="迭代" name="sprintId">
          <Select
            defaultValue={sprintId}
            value={sprintId}
            onChange={value => setSprintId(value)}
            style={{ width: 104 }}
          >
            <Option value="all">全部</Option>
            {sprintList.map(item => (
              <Option key={item.pkId} value={item.pkId}>{item.title}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </Form>
  );

  return (
    <Card title="缺陷累计趋势" extra={<FilterForm />} style={{ marginBottom: 24 }}>
      <div id="graph3" />
    </Card>
  );
};

export default withRouter(BugTrend);
