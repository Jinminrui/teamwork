import React from 'react';
import { Result, Button } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => (
  <div className="wrapper">
    <Result
      className="content"
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary">
          <Link to="/">回到首页</Link>
        </Button>
      }
    />
    ,
  </div>
);

export default ErrorPage;
