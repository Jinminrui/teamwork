import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import './index.scss';
import 'highlight.js/styles/atom-one-dark.css';
import { Button, Input } from 'antd';

const MOCK_DATA =
  'Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.';
const Editor: React.FC = () => {
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (e) {
          console.log(e);
        }
      }
      return ''; // use external default escaping
    },
  });
  const handleEditorChange = ({ html, text }: any) => {
    console.log('handleEditorChange', html, text);
  };
  function renderHTML(text: string) {
    // 模拟异步渲染Markdown
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve(mdParser.render(text));
      }, 0);
    });
  }
  return (
    <div className="editor-wrapper">
      <div className="header">
        <Input placeholder="文章标题" className="title-input" />
      </div>
      <MdEditor
        name="editor"
        value={MOCK_DATA}
        renderHTML={renderHTML}
        onChange={handleEditorChange}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
          },
          imageUrl: 'https://octodex.github.com/images/minion.png',
        }}
        style={{ height: 'calc(100vh - 100px)' }}
      />
      <div className="footer">
        <Button className="btn">放弃</Button>
        <Button type="primary" className="btn">
          保存
        </Button>
      </div>
    </div>
  );
};

export default Editor;
