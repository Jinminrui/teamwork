import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import {
  Modal,
  Typography,
  Divider,
  Select,
  Tag,
  Avatar,
  DatePicker,
  message,
} from 'antd';
import { getTaskDetail, updateTask } from 'api/task';
import { setViewTaskProps, getTaskListSagaAction, getClassInfoSagaAction } from 'store/task/task.action';
import StoryIcon from 'components/Icon/StoryIcon';
import BugIcon from 'components/Icon/BugIcon';
import Label from 'components/Label';
import {
  UserOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  BranchesOutlined,
  SendOutlined,
  SyncOutlined,
  BulbOutlined,
  CheckSquareOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import './index.scss';
import { storyWorkflow, storyPointsOptions, priorityColorMap } from 'config';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ProjectListItem } from 'store/project/project.reducer';
import { getProjectDetail, getProjectMembers } from 'api/project';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const ViewTaskModal = () => {
  const dispatch = useDispatch();
  const { viewTaskProps, classInfo } = useSelector(
    (store: Store) => store.task
  );
  const { taskId, visible, projectId, type, taskClass } = viewTaskProps;
  const [taskDetail, setTaskDetail] = useState<any>({});
  const [projectInfo, setProjectInfo] = useState<ProjectListItem>();
  const [members, setMembers] = useState<Array<any>>([]);

  const controls: any = ['bold', 'italic', 'underline', 'list-ul', 'list-ol'];

  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState('')
  );

  useEffect(() => {
    if (taskId && visible) {
      getTaskDetail(taskId).then(res => {
        setTaskDetail(res.data);
        getProjectDetail(res.data.projectId).then(res1 => {
          setProjectInfo(res1.data);
        });
        getProjectMembers(res.data.projectId).then(res2 => {
          setMembers(res2.data);
        });
      });
    }
  }, [taskId, visible]);

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(taskDetail.note));
  }, [taskDetail]);

  function getTitle(type: number) {
    if (type === 1) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StoryIcon />
          <span style={{ marginLeft: 6 }}>需求</span>
        </div>
      );
    }
    if (type === 2) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BugIcon />
          <span style={{ marginLeft: 6 }}>需求</span>
        </div>
      );
    }
  }

  function formatTime(startTime: string, endTime: string): any {
    if (startTime && endTime) {
      return [moment(startTime), moment(endTime)];
    }
  }

  function handleFieldChange(field: string, value: any) {
    const updateParams: any = {
      pkId: taskDetail.pkId,
    };
    if (field === 'time') {
      updateParams.startTime = moment(value[0]).format('YYYY-MM-DD');
      updateParams.endTime = moment(value[1]).format('YYYY-MM-DD');
    } else {
      updateParams[field] = value;
    }

    updateTask(updateParams).then((res: any) => {
      message.success(res.desc);
      setTaskDetail(res.data);
      if (projectId && type) {
        dispatch(getTaskListSagaAction({ projectId, type, taskClass }));
        if (field === 'taskClass') {
          dispatch(getClassInfoSagaAction({ projectId, type }));
        }
      }
    });
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      title={getTitle(taskDetail.type)}
      centered
      width={666}
      onCancel={() => {
        dispatch(setViewTaskProps({ visible: false, taskId: '' }));
      }}
      bodyStyle={{ maxHeight: 800, height: '100%', overflow: 'auto' }}
    >
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
          {taskDetail.title}
        </Title>
        <Divider />
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<ProjectOutlined />} text="项目" />
          </div>
          <div className="task-info-value" style={{ paddingLeft: 11 }}>
            <Avatar
              size="small"
              shape="square"
              src={projectInfo?.cover}
              style={{ marginRight: 6 }}
            />
            <span>{projectInfo?.name}</span>
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<CheckSquareOutlined />} text="状态" />
          </div>
          <div className="task-info-value">
            <Select
              value={taskDetail.stage}
              style={{ width: 180 }}
              bordered={false}
              onChange={value => {
                handleFieldChange('stage', value);
              }}
            >
              {storyWorkflow.map(item => (
                <Option value={item.name} key={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<UserOutlined />} text="执行者" />
          </div>
          <div className="task-info-value">
            <Select
              style={{ width: 180 }}
              value={taskDetail.executor}
              bordered={false}
              onChange={value => {
                handleFieldChange('executor', value);
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
            <Label icon={<FieldTimeOutlined />} text="时间" />
          </div>
          <div className="task-info-value">
            <DatePicker.RangePicker
              placeholder={['设置开始时间', '设置截止时间']}
              format="YYYY-MM-DD"
              bordered={false}
              value={formatTime(taskDetail.startTime, taskDetail.endTime)}
              onChange={value => { handleFieldChange('time', value); }}
            />
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<FileTextOutlined />} text="备注" />
          </div>
          <div className="task-info-value">
            <BraftEditor
              value={editorState}
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
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<BranchesOutlined />} text="Story Points" />
          </div>
          <div className="task-info-value">
            <Select
              style={{ width: 180 }}
              placeholder="待添加"
              bordered={false}
              value={taskDetail.storyPoints || undefined}
              onChange={value => { handleFieldChange('storyPoints', value); }}
            >
              {storyPointsOptions.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<SendOutlined />} text="优先级" />
          </div>
          <div className="task-info-value">
            <Select
              style={{ width: 180 }}
              placeholder="待添加"
              bordered={false}
              value={taskDetail.priority || undefined}
              onChange={value => { handleFieldChange('priority', value); }}
            >
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
          </div>
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<SyncOutlined />} text="迭代" />
          </div>
          <div className="task-info-value" />
        </div>
        <div className="flex-wrapper">
          <div className="task-info-label">
            <Label icon={<BulbOutlined />} text="需求分类" />
          </div>
          <div className="task-info-value">
            <Select
              style={{ width: 180 }}
              value={taskDetail.taskClass}
              bordered={false}
              onChange={value => { handleFieldChange('taskClass', value); }}
            >
              <Option value="default">未分类需求</Option>
              {classInfo.taskClassList?.map((item: any) => (
                <Option key={item.pkId} value={item.pkId}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
