import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tag,
  message,
  Divider,
  Avatar,
} from 'antd';
import {
  setCreateTaskProps,
  getClassInfoSagaAction,
  getTaskListSagaAction,
} from 'store/task/task.action';
import './index.scss';
import {
  UserOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  SendOutlined,
  SyncOutlined,
  BulbOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { priorityColorMap, storyPointsOptions } from 'config';
import { CreateTaskParams, createTask } from 'api/task';
import moment from 'moment';
import Label from 'components/Label';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Option } = Select;

const controls: any = ['bold', 'italic', 'underline', 'list-ul', 'list-ol'];

const CreateTaskModal: React.FC = () => {
  const dispatch = useDispatch();
  const { createTaskProps, classInfo } = useSelector(
    (store: Store) => store.task
  );
  const { members } = useSelector((store: Store) => store.project);
  const userId = useSelector((store: Store) => store.user.pkId);
  const { type, visible, projectId, taskClass, stage } = createTaskProps;
  const title = type === 1 ? '创建需求' : '创建缺陷';
  const [form] = Form.useForm();

  return (
    <Modal
      title={title}
      visible={visible}
      maskClosable={false}
      centered
      okText="完成"
      cancelText="取消"
      width={600}
      onCancel={() => {
        dispatch(
          setCreateTaskProps({
            visible: false,
            type,
            projectId: '',
            taskClass: 'default',
            stage: '',
          })
        );
      }}
      onOk={() => {
        form.validateFields().then(value => {
          const params: CreateTaskParams = {
            title: value.title,
            note: value.note?.toHTML(),
            type,
            stage,
            startTime: value.time
              ? moment(value.time[0]).format('YYYY-MM-DD')
              : undefined,
            endTime: value.time
              ? moment(value.time[1]).format('YYYY-MM-DD')
              : undefined,
            projectId,
            executor: value.executor,
            storyPoints: value.storyPoints,
            priority: value.priority,
            sprint: value.sprint,
            taskClass: value.taskClass,
            creatorId: userId,
          };
          createTask(params).then(() => {
            message.success('创建成功');
            form.resetFields();
            dispatch(
              setCreateTaskProps({
                visible: false,
                type,
                projectId: '',
                taskClass: 'default',
                stage: '',
              })
            );
            dispatch(getClassInfoSagaAction({ projectId, type }));
            dispatch(
              getTaskListSagaAction({ userId, projectId, type, taskClass })
            );
          });
        });
      }}
    >
      <Form
        form={form}
        name="createTaskForm"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          priority: 1,
          taskClass,
        }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入需求标题' }]}
          colon={false}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea
            placeholder="输入标题以新建任务"
            autoSize={{ minRows: 2, maxRows: 4 }}
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
        <Divider />
        <Form.Item
          label={<Label icon={<UserOutlined />} text="执行者" />}
          labelAlign="left"
          name="executor"
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
          label={<Label icon={<FieldTimeOutlined />} text="时间" />}
          name="time"
          colon={false}
          labelAlign="left"
        >
          <DatePicker.RangePicker
            placeholder={['设置开始时间', '设置截止时间']}
            format="YYYY-MM-DD"
            bordered={false}
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={<FileTextOutlined />} text="备注" />}
          name="note"
          colon={false}
          labelAlign="left"
        >
          <BraftEditor
            controls={controls}
            contentStyle={{ height: 200, fontSize: 14 }}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 4,
              width: '100%',
            }}
            controlBarStyle={{
              boxShadow: 'none',
              borderBottom: '1px solid #e5e5e5',
            }}
          />
        </Form.Item>
        <Form.Item
          label={<Label icon={<BranchesOutlined />} text="Story Points" />}
          name="storyPoints"
          colon={false}
          labelAlign="left"
        >
          <Select style={{ width: 180 }} placeholder="待添加" bordered={false}>
            {storyPointsOptions.map(item => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<Label icon={<SendOutlined />} text="优先级" />}
          name="priority"
          colon={false}
          labelAlign="left"
        >
          <Select style={{ width: 180 }} placeholder="待添加" bordered={false}>
            <Option value={1}>
              <Tag color={priorityColorMap.get(1)}>普通</Tag>
            </Option>
            <Option value={2}>
              <Tag color={priorityColorMap.get(2)}>紧急</Tag>
            </Option>
            <Option value={3}>
              <Tag color={priorityColorMap.get(3)}>非常紧急</Tag>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<Label icon={<SyncOutlined />} text="迭代" />}
          name="sprint"
          colon={false}
          labelAlign="left"
        >
          <Select style={{ width: 180 }} placeholder="待添加" bordered={false}>
            <Option value="default">未规划的任务</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <Label
              icon={<BulbOutlined />}
              text={type === 1 ? '需求分类' : '缺陷分类'}
            />
          }
          name="taskClass"
          colon={false}
          labelAlign="left"
        >
          <Select
            style={{ width: 180 }}
            defaultValue="default"
            bordered={false}
          >
            <Option value="default">
              {type === 1 ? '未分类需求' : '未分类缺陷'}
            </Option>
            {classInfo.taskClassList?.map((item: any) => (
              <Option key={item.pkId} value={item.pkId}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
