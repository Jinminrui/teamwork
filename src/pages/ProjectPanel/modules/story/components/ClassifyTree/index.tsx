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
  const [editClassTitle, setEditClassTitle] = useState('创建分类');
  const [initData, setInitData] = useState<any>(undefined);
  const dispatch = useDispatch();

  const { classInfo, classInfoLoading } = useSelector(
    (store: Store) => store.task
  );

  useEffect(() => {
    dispatch(getClassInfoSagaAction({ projectId, type }));
  }, [projectId, type, dispatch]);

  function handleEditTaskClass(item: any) {
    setInitData(item);
    setEditClassTitle('编辑分类');
    setEditClassModalVisible(true);
  }

  function handleDeleteTaskClass(item: any) {
    confirm({
      title: '您确定要删除该分类吗？',
      icon: <ExclamationCircleOutlined />,
      content: '分类一旦删除，该分类下所有任务将被设为未分类。',
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
              props.setCurrent({
                pkId: undefined,
                name: type === 1 ? '所有需求' : '所有缺陷',
              });
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
              {type === 1 ? '所有需求' : '所有缺陷'} {`· ${classInfo.total || 0}`}
            </div>
          </div>
          {showLeaf && (
            <div className="children-node">
              <div
                className={`node child ${
                  props.current.pkId === 'default' ? 'active' : ''
                }`}
                onClick={() => {
                  props.setCurrent({ pkId: 'default', name: type === 1 ? '未分类需求' : '未分类缺陷' });
                }}
              >
                <div className="dot" />
                <div className="classify-detail">
                  {type === 1 ? '未分类需求' : '未分类缺陷'} {`· ${classInfo.noClassTaskNum || 0}`}
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
                  setEditClassTitle(type === 1 ? '创建需求分类' : '创建缺陷分类');
                }}
              >
                {type === 1 ? '创建需求分类' : '创建缺陷分类'}
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
