import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Empty } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Chart } from '@antv/g2';
import { getFinishedSprints } from 'api/sprint';
import { analyseBurnDown } from 'api/task';
import { height } from '../graphConfig';

const { Option } = Select;

const BurnupGraph: React.FC<RouteComponentProps> = props => {
  const projectId = (props.match.params as any).id;
  const [sprintList, setSprintList] = useState<any>([]);
  const [sprintId, setSprintId] = useState('');
  const [curChart, setChart] = useState<any>();

  useEffect(() => {
    getFinishedSprints(projectId).then(res => {
      if (res.data.length) {
        setSprintList(res.data);
        setSprintId(res.data[0].pkId);
      }
    });
  }, [projectId]);

  useEffect(() => {
    if (sprintId !== '') {
      analyseBurnDown(sprintId).then(res => {
        if (!curChart) {
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
          chart.data(res.data);
          chart.render();
          setChart(chart);
        } else {
          curChart.changeData(res.data);
        }
      });
    }
  }, [curChart, sprintId]);

  const FilterForm = () => (
    <Form layout="inline">
      {sprintList.length !== 0 ? (
        <Form.Item label="迭代" name="sprintId">
          <Select
            defaultValue={sprintList[0].pkId}
            value={sprintId}
            onChange={value => setSprintId(value)}
            style={{ width: 104 }}
          >
            {sprintList.map((item: any) => (
              <Option key={item.pkId} value={item.pkId}>{item.title}</Option>
            ))}
          </Select>
        </Form.Item>
      ) : ''}
    </Form>
  );

  return (
    <Card title="燃尽图" extra={<FilterForm />}>
      <div id="graph4">
        {sprintList.length === 0 && <Empty style={{ height }} description="暂无数据" />}
      </div>
    </Card>
  );
};

export default withRouter(BurnupGraph);
