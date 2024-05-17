import React, { useRef, useState } from 'react'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';


const NotificationPanel = () => {
    
        const userAvatarItems=[
            {
                "label":"Dashboard",
                "link":"/",
                "Icon":<SpaceDashboardSharpIcon/>
            },
            
            {
                "label":"Tontines",
                "link":"#",
                "Icon":<SpaceDashboardSharpIcon/>
            },
            
            {
                "label":"Tontines",
                "link":"#",
                "Icon":<SpaceDashboardSharpIcon/>
            },
            
            {
                "label":"Tontines",
                "link":"#",
                "Icon":<SpaceDashboardSharpIcon/>
            },
    
            {
                "label":"Tontines",
                "link":"#",
                "Icon":<SpaceDashboardSharpIcon/>
            },
        ]
        
        const [toogle,setToogle]=useState(false)
        const butRef=useRef<HTMLDivElement | null>(null);
        const menuRef=useRef<HTMLDivElement | null>(null);
  
        window.addEventListener('click',e=>{
          if(e.target!=menuRef.current && e.target!=butRef.current){
              setToogle(false)
          }
          else{setToogle(false)}
        })
        const handleToogle=()=>{
            setToogle(true)
            console.log(toogle)
        }

  return (
    <div>
        <div ref={butRef} onClick={handleToogle} className='cursor-pointer'>
           <NotificationsNoneRoundedIcon />
        </div>
        {toogle &&
                    <div ref={menuRef} className='absolute bg-gray-800 rounded-lg border-[2px] right-[20px] w-[150px]'>
                    <ul>
                        {userAvatarItems.map((item:any,index:any)=>(
                        <div key={index} className='flex p-2 hover:bg-gray-400 cursor-pointer'>
                                <span className='px-2'>{item.Icon}</span>
                                <li className=''>{item.label}</li>
                        </div>
                        ))}
                    </ul>
                </div>
            
        }
        </div>
        
    
  )
}

export default NotificationPanel