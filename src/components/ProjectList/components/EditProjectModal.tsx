import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, message, Select, Tag } from 'antd';
import './EditProjectModal.scss';
import { UploadOutlined } from '@ant-design/icons';
import { create, CreateProjectParams, update } from 'api/project';
import { ProjectListItem } from 'store/project/project.reducer';
import { useDispatch } from 'react-redux';
import { GET_PROJECT_LIST_SAGA } from 'store/project/actionTypes';
import { projectStatusMap } from 'config';

interface Props {
  visible: boolean;
  title: string;
  setVisibleFalse: () => void;
  initValues?: ProjectListItem;
}

const EditProjectModal: React.FC<Props> = ({
  visible,
  title,
  setVisibleFalse,
  initValues,
}) => {
  const [form] = Form.useForm();
  const [coverUrl, setCoverUrl] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initValues) {
      setCoverUrl(initValues.cover);
    } else {
      setCoverUrl('http://oss.jinminrui.cn/defaultCover.png');
    }
  }, [initValues]);

  const handleOk = () => {
    form.validateFields().then(value => {
      if (title === '新建项目') {
        const creatorId = localStorage.getItem('userId');
        const teamId = localStorage.getItem('teamId');
        if (creatorId && teamId) {
          const params: CreateProjectParams = {
            id: value.id,
            name: value.name,
            cover: coverUrl,
            description: value.description,
            creatorId,
            teamId,
          };
          create(params).then(res => {
            message.success('创建成功');
            form.resetFields();
            setVisibleFalse();
            dispatch({ type: GET_PROJECT_LIST_SAGA });
          });
        }
      } else {
        update({ pkId: initValues?.pkId, ...value }).then(res => {
          message.success('更新成功');
          form.resetFields();
          setVisibleFalse();
          dispatch({ type: GET_PROJECT_LIST_SAGA });
        });
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisibleFalse();
  };

  function handleChange(info: any) {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setCoverUrl(info.file.response.data);
      message.success('上传成功');
      setUploadLoading(false);
    }
    setUploadLoading(false);
  }

  return (
    <Modal
      title={title}
      visible={visible}
      okText={title === '新建项目' ? '立即创建' : '保存修改'}
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      maskClosable={false}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={
          initValues && {
            name: initValues.name,
            description: initValues.description,
            status: initValues.status,
            cover: coverUrl,
            id: initValues.id,
          }
        }
      >
        <Form.Item name="cover" label="项目封面">
          <div className="form-cover-wrapper">
            <img src={coverUrl} alt="cover" className="cover-display" />
            <Upload
              className="upload-btn"
              showUploadList={false}
              action="http://localhost:8081/oss/uploadAvatar"
              onChange={handleChange}
            >
              <Button loading={uploadLoading} type="primary" ghost>
                <UploadOutlined /> 上传新封面
              </Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item
          name="name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="项目名称" style={{ width: 474 }} />
        </Form.Item>
        <Form.Item
          name="id"
          label="项目编号"
          rules={[{ required: true, message: '请输入项目编号' }]}
        >
          <Input
            placeholder="(任务 ID 前缀，2-6 位字母)"
            style={{ width: 474 }}
          />
        </Form.Item>
        <Form.Item name="status" label="项目进度">
          <Select style={{ width: 474 }} placeholder="请确定项目进度">
            {[1, 2, 3].map(item => (
              <Select.Option value={item}>
                <Tag color={projectStatusMap.get(item)?.color}>
                  {projectStatusMap.get(item)?.desc}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="项目简介">
          <Input.TextArea
            placeholder="介绍一下这个项目"
            rows={4}
            style={{ width: 474 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProjectModal;
