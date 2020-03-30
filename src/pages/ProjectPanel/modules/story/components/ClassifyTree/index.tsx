import React, { useState, useEffect } from 'react';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import './index.scss';
import { deleteTaskClass } from 'api/task';
import { Spin, Modal, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getClassInfoSagaAction } from 'store/task/task.action';
import { Store } from 'types';
import EditClassModal from '../EditClassModal';

const { confirm } = Modal;

interface Props {
  current: any;
  setCurrent: (key: any) => void;
  type: number;
  projectId: string;
}

const ClassifyTree = (props: Props) => {
  const { projectId, type } = props;
  const [showLeaf, setShowLeaf] = useState(true);
  const [editClassModalVisible, setEditClassModalVisible] = useState(false);
  const [editClassTitle, setEditClassTitle] = useState('创建需求分类');
  const [initData, setInitData] = useState<any>(undefined);
  const dispatch = useDispatch();

  const { classInfo, classInfoLoading } = useSelector((store: Store) => store.task);

  useEffect(() => {
    dispatch(getClassInfoSagaAction({ projectId, type }));
  }, [projectId, type, dispatch]);

  function handleEditTaskClass(item: any) {
    setInitData(item);
    setEditClassTitle('编辑需求分类');
    setEditClassModalVisible(true);
  }

  function handleDeleteTaskClass(item: any) {
    confirm({
      title: '您确定要删除该需求分类吗？',
      icon: <ExclamationCircleOutlined />,
      content: '需求分类一旦删除，该分类下所有需求将被设为未分类需求。',
      okType: 'danger',
      okText: '确定',
      cancelText: '放弃',
      onOk() {
        deleteTaskClass(item.pkId).then(() => {
          message.success('删除成功');
          dispatch(getClassInfoSagaAction({ projectId, type }));
        });
      },
    });
  }

  return (
    <Spin spinning={classInfoLoading}>
      <div className="classify-container">
        <div className="node-wrapper">
          <div
            className={`node ${
              props.current.pkId === undefined ? 'active' : ''
            }`}
            onClick={() => {
              props.setCurrent({ pkId: undefined, name: '所有需求' });
            }}
          >
            <div
              className="icon"
              onClick={() => {
                setShowLeaf(!showLeaf);
              }}
            >
              {showLeaf ? <CaretDownOutlined /> : <CaretRightOutlined />}
            </div>
            <div className="classify-detail">
              所有需求 {`· ${classInfo.total || 0}`}
            </div>
          </div>
          {showLeaf && (
            <div className="children-node">
              <div
                className={`node child ${
                  props.current.pkId === 'default' ? 'active' : ''
                }`}
                onClick={() => {
                  props.setCurrent({ pkId: 'default', name: '未分类需求' });
                }}
              >
                <div className="dot" />
                <div className="classify-detail">
                  未分类需求 {`· ${classInfo.noClassTaskNum || 0}`}
                </div>
              </div>
              {classInfo?.taskClassList?.map((item: any) => (
                <div
                  key={item.pkId}
                  className={`node child has-actions ${
                    props.current.pkId === item.pkId ? 'active' : ''
                  }`}
                  onClick={() => {
                    props.setCurrent(item);
                  }}
                >
                  <div>
                    <div className="dot" />
                    <span className="classify-detail">
                      {item.name} {`· ${item.taskNum}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div
                      className="class-action"
                      onClick={e => {
                        e.stopPropagation();
                        handleEditTaskClass(item);
                      }}
                    >
                      <EditOutlined />
                    </div>
                    <div
                      className="class-action"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteTaskClass(item);
                      }}
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="link"
                icon={<PlusCircleFilled />}
                style={{ marginTop: 10 }}
                onClick={() => {
                  setEditClassModalVisible(true);
                  setEditClassTitle('创建需求分类');
                }}
              >
                创建需求分类
              </Button>
            </div>
          )}
        </div>
      </div>
      {editClassModalVisible && (
        <EditClassModal
          projectId={projectId}
          type={type}
          visible={editClassModalVisible}
          setVisibleFalse={() => {
            setEditClassModalVisible(false);
          }}
          title={editClassTitle}
          initValues={initData}
          setInitDataUndefined={() => setInitData(undefined)}
        />
      )}
    </Spin>
  );
};

export default ClassifyTree;
