import React, { useState, useEffect } from 'react';
import { Tooltip, Spin, message, Modal } from 'antd';
import './index.scss';
import {
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ProjectListItem } from 'store/project/project.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types';
import { GET_PROJECT_LIST_SAGA } from 'store/project/actionTypes';
import { deleteProject, DeleteProjectParams } from 'api/project';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EditProjectModal from './components/EditProjectModal';

const { confirm } = Modal;

const ProjectList = (props: RouteComponentProps) => {
  const userId = useSelector((store: Store) => store.user.pkId);
  const teamId = useSelector((store: Store) => store.team.teamId);
  const projectList = useSelector((store: Store) => store.project.list);
  const listLoading = useSelector((store: Store) => store.project.listLoading);
  const [editProjectModalVisible, setEditProjectModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [projectDetail, setProjectDetail] = useState<
    ProjectListItem | undefined
  >(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_PROJECT_LIST_SAGA });
  }, [dispatch]);

  const handleDeleteProject = (item: ProjectListItem) => {
    if (teamId) {
      const params: DeleteProjectParams = {
        projectId: item.pkId,
        operatorId: userId,
        projectName: item.name,
        teamId,
      };
      deleteProject(params).then((res: any) => {
        message.success(res.desc);
        dispatch({ type: GET_PROJECT_LIST_SAGA });
      });
    }
  };

  return (
    <Spin spinning={listLoading}>
      <div className="project-list-wrapper">
        {projectList.map(item => (
          <div
            className="project-item-wrapper"
            key={item.pkId}
            onClick={() => {
              props.history.push(`/home/project/${item.pkId}/story`);
            }}
          >
            <div
              className="item-card mask"
              style={{ backgroundImage: `url("${item.cover}")` }}
            >
              <div className="card-header">
                <div className="project-name">{item.name}</div>
                <div className="project-setting">
                  <Tooltip title="打开项目设置">
                    <SettingOutlined
                      style={{ fontSize: 16 }}
                      onClick={e => {
                        e.stopPropagation();
                        setModalTitle('编辑项目');
                        setEditProjectModalVisible(true);
                        setProjectDetail(item);
                      }}
                    />
                  </Tooltip>

                  <DeleteOutlined
                    style={{ fontSize: 16 }}
                    onClick={e => {
                      e.stopPropagation();
                      confirm({
                        title: '确定要删除此项目吗？',
                        icon: <ExclamationCircleOutlined />,
                        okText: '确定',
                        okType: 'danger',
                        cancelText: '放弃',
                        onOk() {
                          handleDeleteProject(item);
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="card-middle">{item.description}</div>
            </div>
          </div>
        ))}
        <div
          className="project-item-wrapper"
          onClick={() => {
            setModalTitle('新建项目');
            setEditProjectModalVisible(true);
            setProjectDetail(undefined);
          }}
        >
          <div className="add-card item-card">
            <PlusOutlined />
            <p>创建新项目</p>
          </div>
        </div>
      </div>
      {editProjectModalVisible && (
        <EditProjectModal
          visible={editProjectModalVisible}
          title={modalTitle}
          setVisibleFalse={() => {
            setEditProjectModalVisible(false);
          }}
          initValues={projectDetail}
        />
      )}
    </Spin>
  );
};

export default withRouter(ProjectList);
