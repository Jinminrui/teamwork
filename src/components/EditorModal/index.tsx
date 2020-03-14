import React, { useState, useEffect } from 'react';
import { Modal, Select, message } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import BraftEditor from 'braft-editor';
import './index.scss';
import 'braft-editor/dist/index.css';
import { docsTag } from 'pages/docs';
import { update, AddDocParams, addDoc } from 'api/doc';

interface Props {
  visible: boolean;
  setVisibleFalse: () => void;
}

const { Option } = Select;

const excludeControls: any = [
  'letter-spacing',
  'clear',
  'remove-styles',
  'superscript',
  'subscript',
  'text-align',
  'fullscreen',
];

const EditorModal: React.FC<Props> = ({
  visible,
  setVisibleFalse,
}) => {
  const authorId = localStorage.getItem('userId');
  const teamId = localStorage.getItem('teamId');
  const EDITOR_HEIGHT =
    document.documentElement.getBoundingClientRect().height - 228;
  const screenWidth = useSelector((store: Store) => store.app.screenWidth);
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState('')
  );
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [docId, setDocId] = useState('');

  const clear = () => {
    setTitle('');
    setType('');
    setEditorState(BraftEditor.createEditorState(''));
    localStorage.setItem('editorInfo', '');
    setVisibleFalse();
  };

  const handleSubmit = () => {
    if (docId) {
      update({ pkId: docId, title, type, content: editorState.toHTML() }).then((res: any) => {
        message.success(res.desc);
        window.location.reload();
        clear();
      });
    } else if (authorId && teamId) {
      const params: AddDocParams = {
        title,
        content: editorState.toHTML(),
        authorId,
        teamId,
        projectId: '',
        type,
      };
      addDoc(params).then(res => {
        message.success('保存成功');
        window.location.reload();
        clear();
      });
    }
  };

  const handleChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    const editorInfoString = localStorage.getItem('editorInfo');
    if (editorInfoString && visible) {
      const editorInfo = JSON.parse(editorInfoString);
      setTitle(editorInfo.title);
      setType(editorInfo.type);
      setEditorState(BraftEditor.createEditorState(editorInfo.content));
      setDocId(editorInfo.pkId);
    }
  }, [visible]);

  return (
    <Modal
      title="文档编辑"
      visible={visible}
      style={{ top: 0 }}
      width={screenWidth}
      onOk={handleSubmit}
      okButtonProps={{ disabled: !type || !title || editorState.isEmpty() }}
      onCancel={() => {
        clear();
      }}
      okText="立即发布"
      cancelText="取消"
      maskClosable={false}
      keyboard={false}
    >
      <div className="editor-modal-main-wrapper">
        <div className="editor-container">
          <div className="title-input-wrapper">
            <input
              type="text"
              value={title}
              placeholder="输入文档标题"
              className="editor-input"
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="editor-area">
            <BraftEditor
              value={editorState}
              onChange={handleChange}
              contentClassName="editor"
              controlBarStyle={{ boxShadow: 'none' }}
              style={{ height: EDITOR_HEIGHT }}
              contentStyle={{ height: EDITOR_HEIGHT - 100 }}
              excludeControls={excludeControls}
              placeholder="点击开始输入正文"
            />
          </div>
          <div className="select-type-wrapper">
            <span>文档类型：</span>
            <Select
              placeholder="请选择文档类型"
              value={type}
              onChange={value => {
                setType(value);
              }}
              style={{ width: 120 }}
              bordered={false}
            >
              {docsTag.slice(1).map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditorModal;
