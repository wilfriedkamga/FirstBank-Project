import React from 'react'
import { Outlet } from 'react-router-dom'

const CaisseContent = () => {
  return (
    
    <div className='h-full '>
     <Outlet/>
    </div>
  )
}

export default CaisseContent