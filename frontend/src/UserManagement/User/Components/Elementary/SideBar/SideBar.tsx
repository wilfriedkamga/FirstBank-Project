import React from 'react'
import { FaCog, FaHome, FaPoll, FaRegEnvelope, FaRegFileAlt } from 'react-icons/fa'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import SideBarItem from './SideBarItem';

const sidebarItems=[
    {
        "label":"Dashboard",
        "link":"/tontine/",
        "icon":SpaceDashboardSharpIcon
    },
    {
        "label":"Mes Tontines",
        "link":"/tontine/mestontines",
        "icon":SpaceDashboardSharpIcon
    },
    ,
    {
        "label":"Mes cotisations",
        "link":"/tontine/mescotisations",
        "icon":SpaceDashboardSharpIcon
    },
    ,
    {
        "label":"Mes sanctions",
        "link":"/tontine/messanctions",
        "icon":SpaceDashboardSharpIcon
    },
    ,
    {
        "label":"Mes dettes",
        "link":"/tontine/mesdettes",
        "icon":SpaceDashboardSharpIcon
    },
]
type sidebarItem = {
    label: string;
    link: string;
    Icon:any
  };


function SideBar() {
  return (
     <div className='w-full h-full bg-gray-50  flex flex-col gap-6 p-5 '>
             <h1 className='flex gap-1 items-center'>
                <span className='text-2xl font-bold text-black'>FBTontine</span>
            </h1>
           
            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                 { sidebarItems.map((item:any)=>(
                     <SideBarItem label={item.label} link={item.link} Icon={item.Icon}/>
                 ))}
           </div>
           <div className=''>
                <button className='w-full flex gap-2 p-2 items-center text-lg font-bold text-black-800'>
                   
                    <span>Settings</span>
                </button>
      </div>
     </div>
  )
}

export default SideBar