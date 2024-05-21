import React from 'react'
import SideBar from '../../Components/Elementary/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Elementary/Navbar/Navbar'


export default function TontineHomePage() {
  return (
   
      <div className='w-full h-screen flex  md:flex-row z-100 relative'>
        <div className='w-1/5 h-screen bg-white sticky z-100 top-0 hidden md:block'>
          <SideBar/>
        </div>
        <div className='flex-1 overflow-y-auto'>
          <Navbar />

          <div className=''>
            <Outlet/>
          </div>
        </div>
    </div>
        
    
  )
}
