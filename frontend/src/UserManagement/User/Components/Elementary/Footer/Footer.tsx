import React from 'react'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';

const Footer = () => {
  return (
    <div className='flex justify-between   items-center px-4 py-2  '>
         <div className='text-white hover:bg-red-800 px-4 py-2 font-bold'>
              <SpaceDashboardSharpIcon/>
         </div>
         <div className='text-white hover:bg-red-800  px-4 py-2  font-bold'>
         <SpaceDashboardSharpIcon/>
         </div>
         <div className='text-white hover:bg-red-800  px-4 py-2 font-bold'>
         <SpaceDashboardSharpIcon/>
         </div>
    </div>
  )
}

export default Footer