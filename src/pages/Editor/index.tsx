/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Button, message, PageHeader, Tag } from 'antd';
import { throttle } from 'lodash';
import BraftEditor from 'braft-editor';
// eslint-disable-next-line import/no-unresolved
import 'braft-editor/dist/index.css';

import './index.scss';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import { addDoc, AddDocParams, update } from 'api/doc';
import { RouteComponentProps } from 'react-router-dom';

const Editor = (props: RouteComponentProps) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState('')
  );
  const [editHeight, setEditHeight] = useState(0);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [saveable, setSaveable] = useState(false);
  const [pkId, setpkId] = useState<string|undefined>(undefined);

  const userInfo = useSelector((store: Store) => store.user);
  const { teamId } = useSelector((store: Store) => store.team);

  useEffect(() => {
    const value = localStorage.getItem('editorInfo');
    if (value) {
      const { title, type, pkId, content } = JSON.parse(value);
      setTitle(title);
      setType(type);
      if (pkId) {
        setpkId(pkId);
        setEditorState(BraftEditor.createEditorState(content));
      }
    } else {
      props.history.push('/home/team-docs');
    }
    return () => {
      localStorage.setItem('editorInfo', '');
    };
  }, [props.history]);

  const handleResize = throttle(() => {
    const controllerBarHeight = document
      .getElementsByClassName('bf-controlbar')[0]
      .getBoundingClientRect().height;
    const initHeight =
      document.documentElement.getBoundingClientRect().height -
      controllerBarHeight -
      240;
    setEditHeight(initHeight);
  }, 1000);

  useEffect(() => {
    const controllerBarHeight = document
      .getElementsByClassName('bf-controlbar')[0]
      .getBoundingClientRect().height;
    const initHeight =
      document.documentElement.getBoundingClientRect().height -
      controllerBarHeight -
      240;
    setEditHeight(initHeight);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  const handleAddDoc = () => {
    if (pkId) {
      update({ pkId, content: editorState.toHTML() }).then((res: any) => {
        message.success(res.desc);
        props.history.push('/home/team-docs');
      });
    } else if (userInfo.pkId && teamId) {
      const params: AddDocParams = {
        title,
        content: editorState.toHTML(),
        authorId: userInfo.pkId,
        teamId,
        projectId: '',
        type,
      };
      setSaveable(true);
      addDoc(params).then(res => {
        message.success('保存成功');
        props.history.push('/home/team-docs');
      });
    }
  };

  return (
    <div>
      <PageHeader
        title={title}
        style={{ background: '#ffffff' }}
        subTitle={<Tag>{type}</Tag>}
        avatar={{ src: userInfo.avatar }}
        onBack={() => {
          window.history.back();
        }}
      />
      <div className="editor-wrapper">
        <div className="editor-area">
          <BraftEditor
            value={editorState}
            onChange={handleChange}
            contentClassName="editor"
            contentStyle={{ height: editHeight }}
          />
          <div className="footer">
            <Button
              className="btn"
              onClick={() => {
                window.history.back();
              }}
            >
              放弃
            </Button>
            <Button
              type="primary"
              disabled={saveable}
              className="btn"
              onClick={handleAddDoc}
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
