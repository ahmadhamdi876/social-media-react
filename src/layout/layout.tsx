import React from 'react'
import Nav from '../components/navbar/Nav'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
   <Nav/>

 <div className='container w-[80%] mx-auto'>
  <Outlet/>
 </div>

   <Footer/>
  
  </>
}
