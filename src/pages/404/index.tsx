import React from 'react';
import NotFound from './404.svg';
import './index.scss';

const ErrorPage: React.FC = () => (
  <div className="img-wrapper">
    <img src={NotFound} alt="" />
  </div>
);

export default ErrorPage;
