import React, { useEffect, FC, useState } from 'react';
import { Modal, Divider, Typography, Select, Avatar, DatePicker } from 'antd';
import { getSprintDetail, UpdateSprintParams, updateSprint } from 'api/sprint';
import Label from 'components/Label';
import { CheckSquareOutlined, UserOutlined, FieldTimeOutlined, FileTextOutlined } from '@ant-design/icons';
import { sprintStatusMap } from 'config';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { formatRangePickerMoment } from 'utils';
import moment from 'moment';
import { getSpringLisSagaAction } from 'store/task/task.action';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Props {
  projectId: string;
  visible: boolean;
  setUnvisible: () => void;
  sprintId: string;
}

const ViewSprintModal: FC<Props> = ({ visible, setUnvisible, sprintId, projectId }) => {
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();
  const { members } = useSelector((store: Store) => store.project);
  function handleFieldChange(field: string, value: any) {
    const updateParams: UpdateSprintParams = {
      pkId: data.pkId,
    };

    if (field === 'time' && value) {
      updateParams.startTime = moment(value[0]).format('YYYY-MM-DD');
      updateParams.endTime = moment(value[1]).format('YYYY-MM-DD');
    } else {
      updateParams[field] = value;
    }

    updateSprint(updateParams).then(res => {
      if (sprintId) {
        getSprintDetail(sprintId).then(res1 => {
          setData(res1.data);
        });
      }
      dispatch(getSpringLisSagaAction({ projectId }));
    });
  }

  useEffect(() => {
    if (sprintId) {
      getSprintDetail(sprintId).then(res => {
        setData(res.data);
      });
    }
  }, [sprintId]);
  return (
    <Modal
      visible={visible}
      title="迭代详情"
      onCancel={() => {
        setUnvisible();
      }}
      footer={null}
    >
      {data && (
        <div className="task-detail-wrapper">
          <Title
            className="task-title"
            level={4}
            editable={{
              onChange: value => {
                handleFieldChange('title', value);
              },
            }}
          >
            {data.title}
          </Title>
          <Divider />
          <div className="flex-wrapper">
            <div className="task-info-label">
              <Label icon={<CheckSquareOutlined />} text="状态" />
            </div>
            <div className="task-info-value">
              <Select
                value={data.status}
                style={{ width: 180 }}
                bordered={false}
                onChange={value => {
                  handleFieldChange('status', value);
                }}
              >
                {[1, 2, 3].map(item => (
                  <Option value={item} key={item}>
                    {sprintStatusMap.get(item)}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex-wrapper">
            <div className="task-info-label">
              <Label icon={<UserOutlined />} text="负责人" />
            </div>
            <div className="task-info-value">
              <Select
                style={{ width: 180 }}
                value={data.director}
                bordered={false}
                onChange={value => {
                  handleFieldChange('director', value);
                }}
              >
                <Option value="none">
                  <span className="avatar-option">
                    <Avatar
                      size="small"
                      style={{ marginRight: 6 }}
                      icon={<UserOutlined />}
                    />
                  待认领
                  </span>
                </Option>
                {members.map(item => (
                  <Option value={item.info.pkId} key={item.info.pkId}>
                    <span className="avatar-option">
                      <Avatar
                        size="small"
                        style={{ marginRight: 6 }}
                        src={item.info.avatar}
                      />
                      {item.info.username}
                    </span>
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex-wrapper">
            <div className="task-info-label">
              <Label icon={<FieldTimeOutlined />} text="周期" />
            </div>
            <div className="task-info-value">
              <DatePicker.RangePicker
                placeholder={['设置开始日期', '设置截止日期']}
                format="YYYY-MM-DD"
                bordered={false}
                value={formatRangePickerMoment(data.startTime, data.endTime)}
                onChange={value => {
                  handleFieldChange('time', value);
                }}
              />
            </div>
          </div>
          <div className="flex-wrapper">
            <div className="task-info-label">
              <Label icon={<FileTextOutlined />} text="描述" />
            </div>
            <div className="task-info-value">
              <Paragraph editable={{
                onChange: value => {
                  handleFieldChange('description', value);
                },
              }}
              >
                {data.description || ''}
              </Paragraph>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewSprintModal;
