import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import './Layout.css';

const Layout = () => {
  return (
    <div className='layout-container'>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
