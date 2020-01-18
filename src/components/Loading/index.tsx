import React from 'react';
import './index.scss';
import LoadingGif from './loading.gif';

const Loading = () => (
  <div className="loading-wrapper">
    <img src={LoadingGif} alt="" />
  </div>
);

export default Loading;
