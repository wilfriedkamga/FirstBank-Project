import React from 'react'
import SideBar from '../../Components/Elementary/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Elementary/Navbar/Navbar'
import Footer from '../../Components/Elementary/Footer/Footer'
import MobileSideBar from '../../Components/Elementary/SideBar/MobileSideBar'


export default function TontineHomePage() {
  return (
   
      <div className=' w-full h-screen flex  md:flex-row z-100 relative'>
        <div className='w-1/5 h-screen bg-white sticky z-100 top-0 hidden md:block'>
          <SideBar/>
        </div>
        <div className='w-1/5 h-screen bg-white sticky z-100 top-0 md:hidden block'>
          <MobileSideBar/>
        </div>
        <div className='flex-1 overflow-y-auto'>
          <Navbar />

          <div className=' bg-[#828181] p-3 h-full'>
            <Outlet/>
          </div>
        
        </div>
        <div className=' block sm:hidden absolute bottom-0  h-[60px]'>
        <Footer/>
        </div>
        
    </div>
        
    
  )
}
