import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../component/header.jsx';
import Footer from '../../component/Footer.jsx';


export default function HomeTemplate() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}
