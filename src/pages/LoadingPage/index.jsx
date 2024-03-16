import React from 'react';
import { SyncLoader } from 'react-spinners';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className='loading-container'>
      <h3>잠시만 기다려 주세요.</h3>
      <SyncLoader />
    </div>
  );
};

export default LoadingPage;
