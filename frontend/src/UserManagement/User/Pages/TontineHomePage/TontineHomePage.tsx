import React from 'react'
import SideBar from '../../Components/Elementary/SideBar/SideBar'
import DashBar from '../../Components/Elementary/DashBar/DashBar'

export default function TontineHomePage() {
  return (
    <div className='flex bg-white w-full absolute h-full'>
        <SideBar/>
        <DashBar/>
    </div>
  )
}
