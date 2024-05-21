import React from 'react'
import { Outlet } from 'react-router-dom'

const CaisseContent = () => {
  return (
    
    <div className='h-full  py-4'>
     <Outlet/>
    </div>
  )
}

export default CaisseContent