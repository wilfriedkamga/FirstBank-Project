import React, { useState } from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationPanel from './NotificationPanel';
import UserAvatar from './UserAvatar';

type ChildComponentProps={
  setMobileSidebarVisibility:(test:boolean)=>void;
  mobilesidebarVisivility:boolean
}
const Navbar = ({setMobileSidebarVisibility, mobilesidebarVisivility}:ChildComponentProps) => {
  
  return (
    <div className=' relative rounded-right flex justify-between items-center bg-red-600  px-4 py-3 2xl:py-4 sticky z-100 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={()=>setMobileSidebarVisibility(!mobilesidebarVisivility)}
          className='text-2xl text-white pr-3 font-bold block md:hidden'
        >
          ☰
        </button>
        </div>
        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
        <SearchRoundedIcon className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </div>
        <div className='flex gap-2 items-center'>
            <NotificationPanel />

            <UserAvatar />
      </div>
    </div>
  )
}

export default Navbar