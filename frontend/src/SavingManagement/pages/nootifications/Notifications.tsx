import React from 'react'
import Header from '../../components/header/Header'
import BottomNavigation from '../../components/bottom navigation/BottomNavigation'
import Footer from '../../../UserManagement/User/Components/Elementary/Footer/Footer'

const Notifications = () => {
  return (
    <div className='w-full bg-white h-[1000vh]  flex flex-col'>
     
        <Header />
      
      
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  )
}

export default Notifications
