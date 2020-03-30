import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getDetail, deleteDoc } from 'api/doc';
import { PageHeader, Tag, Button, Popconfirm, message } from 'antd';
import './DocDetail.scss';
import EditorModal from 'components/EditorModal';

const DocDetail = (props: RouteComponentProps) => {
  const { id } = (props.match.params as any);
  const userId = localStorage.getItem('userId');
  const [detail, setDetail] = useState<any>({});
  const [editorModalVisible, setEditorModalVisible] = useState(false);

  useEffect(() => {
    getDetail(id).then(res => {
      setDetail(res.data);
      const container = document.querySelector('.detail-content');
      if (container) {
        container.innerHTML = res.data.content;
      }
    });
  }, [id]);

  const handleDeleteDoc = (docId: string) => {
    deleteDoc(docId).then((res: any) => {
      message.success(res.desc);
    });
  };

  return (
    <div>
      <EditorModal
        visible={editorModalVisible}
        setVisibleFalse={() => {
          setEditorModalVisible(false);
        }}
      />
      <div className="docDetail-header">
        <PageHeader
          title={detail.title}
          onBack={() => window.history.back()}
          subTitle={<Tag>{detail.type}</Tag>}
          avatar={{ src: detail.authorInfo?.avatar }}
          extra={
          detail.authorId === userId
            ? [
              <Button
                type="link"
                key="1"
                onClick={() => {
                  const editorInfo = {
                    content: detail.content,
                    pkId: detail.pkId,
                    title: detail.title,
                    type: detail.type,
                  };
                  localStorage.setItem(
                    'editorInfo',
                    JSON.stringify(editorInfo)
                  );
                  setEditorModalVisible(true);
                }}
              >
                  编辑
              </Button>,
              <Popconfirm
                title="确定要删除吗"
                okText="删除"
                cancelText="取消"
                placement="bottom"
                key="2"
                onConfirm={() => {
                  handleDeleteDoc(detail.pkId);
                  window.history.back();
                }}
              >
                <Button type="link" danger>
                    删除
                </Button>
              </Popconfirm>,
            ]
            : undefined
        }
        >
          <div style={{ textAlign: 'right', color: 'rgba(0,0,0,.25)' }}>
            <span>{detail.authorInfo?.username}</span>
            <span style={{ marginLeft: 4 }}>发布于 {detail.updateTime}</span>
          </div>
        </PageHeader>
      </div>
      <div className="detail-content" />
    </div>
  );
};

export default DocDetail;
