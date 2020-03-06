import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { throttle } from 'lodash';
import BraftEditor from 'braft-editor';
// eslint-disable-next-line import/no-unresolved
import 'braft-editor/dist/index.css';

import './index.scss';

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState('')
  );
  const [outputHtml, setOutputHtml] = useState('<p></p>');
  const [editHeight, setEditHeight] = useState(0);

  const handleResize = throttle(() => {
    const controllerBarHeight = document
      .getElementsByClassName('bf-controlbar')[0]
      .getBoundingClientRect().height;
    const initHeight =
      document.documentElement.getBoundingClientRect().height -
      controllerBarHeight -
      120;
    setEditHeight(initHeight);
  }, 1000);

  useEffect(() => {
    const controllerBarHeight = document
      .getElementsByClassName('bf-controlbar')[0]
      .getBoundingClientRect().height;
    const initHeight =
      document.documentElement.getBoundingClientRect().height -
      controllerBarHeight -
      120;
    setEditHeight(initHeight);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleChange = (newEditorState: any) => {
    setEditorState(newEditorState);
    setOutputHtml(editorState.toHTML());
  };

  return (
    <div>
      <div className="editor-wrapper">
        <div className="header">
          <Input placeholder="文章标题" className="title-input" />
        </div>
        <BraftEditor
          value={editorState}
          onChange={handleChange}
          contentClassName="editor-style"
          contentStyle={{ height: editHeight }}
        />
      </div>
      <div className="footer">
        <Button className="btn">放弃</Button>
        <Button
          type="primary"
          className="btn"
          onClick={() => {
            console.log(outputHtml);
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default Editor;
