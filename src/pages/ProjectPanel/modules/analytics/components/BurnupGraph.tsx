import React, { useState, useEffect } from 'react';
import { Card, Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Chart } from '@antv/g2';
import { height } from '../graphConfig';

const { Option } = Select;

const BurnupGraph: React.FC<RouteComponentProps> = props => {
  // const projectId = (props.match.params as any).id;
  const { sprintList } = useSelector((store: Store) => store.task);
  const [sprintId, setSprintId] = useState(sprintList.length ? sprintList[0].pkId : undefined);

  useEffect(() => {
    const data = [
      {
        date: '2020-04-07',
        type: '实际剩余Story Points',
        value: 10,
      },
      {
        date: '2020-04-07',
        type: '理想剩余Story Points',
        value: 10,
      },
      {
        date: '2020-04-08',
        type: '实际剩余Story Points',
        value: 7,
      },
      {
        date: '2020-04-08',
        type: '理想剩余Story Points',
        value: 8,
      },
      {
        date: '2020-04-09',
        type: '实际剩余Story Points',
        value: 5,
      },
      {
        date: '2020-04-09',
        type: '理想剩余Story Points',
        value: 6,
      },
      {
        date: '2020-04-10',
        type: '实际剩余Story Points',
        value: 4,
      },
      {
        date: '2020-04-10',
        type: '理想剩余Story Points',
        value: 4,
      },
      {
        date: '2020-04-11',
        type: '实际剩余Story Points',
        value: 1,
      },
      {
        date: '2020-04-11',
        type: '理想剩余Story Points',
        value: 2,
      },
      {
        date: '2020-04-12',
        type: '实际剩余Story Points',
        value: 1,
      },
      {
        date: '2020-04-12',
        type: '理想剩余Story Points',
        value: 0,
      },
    ];
    const chart: Chart = new Chart({
      container: 'graph4',
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
      alias: 'Story Points',
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
      .shape('circle');
    chart.data(data);

    chart.render();
  }, []);

  const FilterForm = () => (
    <Form layout="inline">
      {sprintList.length && (
        <Form.Item label="迭代" name="sprintId">
          <Select
            defaultValue={sprintList[0].pkId}
            value={sprintId}
            onChange={value => setSprintId(value)}
            style={{ width: 104 }}
          >
            {sprintList.map(item => (
              <Option key={item.pkId} value={item.pkId}>{item.title}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </Form>
  );

  return (
    <Card title="燃尽图" extra={<FilterForm />}>
      <div id="graph4" />
    </Card>
  );
};

export default withRouter(BurnupGraph);
