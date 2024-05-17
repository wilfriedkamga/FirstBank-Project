import React from 'react'
import { Link } from 'react-router-dom';

type ChildComponentProps={
    sideBarItems:[]
}
type sidebarItem = {
    label: string;
    link: string;
    Icon:any
  };
  

  
  const SideBarItem: React.FC<sidebarItem> = ({ label,link,Icon }) => {
  return (
    <div>
        <Link
         to={link}
        
        className="w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-red-500"
        >
        
        <span className='hover:text-white'>{label}</span>
      </Link>
    </div>
  )
}

export default SideBarItem