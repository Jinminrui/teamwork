import React from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Avatar,
  DatePicker,
  message,
} from 'antd';
import Label from 'components/Label';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { CreateSprintParams, createSprint } from 'api/sprint';
import moment from 'moment';
import { getSpringLisSagaAction } from 'store/task/task.action';

const { Option } = Select;

interface Props {
  visible: boolean;
  projectId: string;
  setUnVisible: () => void;
}

const CreateSprintModal: React.FC<Props> = ({
  visible,
  setUnVisible,
  projectId,
}) => {
  const [form] = Form.useForm();
  const { members } = useSelector((store: Store) => store.project);
  const creatorId = useSelector((store: Store) => store.user.pkId);
  const teamId = useSelector((store: Store) => store.team.teamId);
  const dispatch = useDispatch();
  return (
    <Modal
      title="创建迭代"
      visible={visible}
      maskClosable={false}
      okText="完成"
      cancelText="取消"
      onCancel={() => {
        setUnVisible();
      }}
      onOk={() => {
        if (teamId) {
          form.validateFields().then(value => {
            const params: CreateSprintParams = {
              creatorId,
              teamId,
              title: value.title,
              director: value.director,
              startTime: value.time
                ? moment(value.time[0]).format('YYYY-MM-DD')
                : undefined,
              endTime: value.time
                ? moment(value.time[1]).format('YYYY-MM-DD')
                : undefined,
              projectId,
              description: value.description,
            };
            createSprint(params).then((res: any) => {
              message.success(res.desc);
              form.resetFields();
              setUnVisible();
              dispatch(getSpringLisSagaAction({ projectId }));
            });
          });
        }
      }}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入迭代标题' }]}
          colon={false}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea
            placeholder="迭代标题"
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{
              resize: 'none',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              fontSize: 16,
              padding: 0,
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.85)',
            }}
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={<UserOutlined />} text="负责人" />}
          labelAlign="left"
          name="director"
          colon={false}
        >
          <Select style={{ width: 180 }} defaultValue="none" bordered={false}>
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
        </Form.Item>
        <Form.Item
          label={<Label icon={<CalendarOutlined />} text="周期" />}
          labelAlign="left"
          name="time"
          colon={false}
          rules={[{ required: true, message: '请确定迭代周期' }]}
        >
          <DatePicker.RangePicker
            placeholder={['设置开始时间', '设置截止时间']}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={<FileTextOutlined />} text="描述" />}
          labelAlign="left"
          name="description"
          colon={false}
        >
          <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSprintModal;
