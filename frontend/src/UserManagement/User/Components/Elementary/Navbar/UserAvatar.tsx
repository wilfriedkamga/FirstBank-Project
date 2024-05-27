import React, { useEffect, useRef, useState } from 'react'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';
import Variable from '../../../../../Variable';
import { getInitials } from '../Utils';
import { Link } from 'react-router-dom';



const UserAvatar = () => {
    const userAvatarItems=[
        {
            "label":"Portail",
            "link":"/home",
            "Icon":<SpaceDashboardSharpIcon/>
        },
        {
            "label":"Portail",
            "link":"#",
            "Icon":<SpaceDashboardSharpIcon/>
        },
        
        {
            "label":"Déconnexion",
            "link":"/",
            "Icon":<SpaceDashboardSharpIcon/>
        },
        
       
    ]
    type userAvatarItem = {
        abel: string;
        link: string;
        Icon:any
      };
      const [toogle,setToogle]=useState(false)
      const butRef=useRef<HTMLDivElement | null>(null);
      const menuRef=useRef<HTMLDivElement | null>(null);
      const user = Variable.getLocalStorageItem("user")

      const handleLogout = () => {
        alert("vous allez vous déconnecté")
        Variable.removeFromLocalStorage("user");
    };

      window.addEventListener('click',e=>{
        if(e.target!=menuRef.current && e.target!=butRef.current){
            setToogle(false)
        }
      })
      
  return (
   <> 
   
    <div className=''>
        <div ref={butRef} onClick={()=>setToogle(!toogle)} className='w-[45px]  flex justify-center items-center font-bold h-[45px] rounded-full text-white bg-[#828181] cursor-pointer'>
                {getInitials(user.user.fullName)}
        </div>
        {toogle?
                <div ref={menuRef} className='absolute bg-gray-100 rounded-lg border-[2px] right-[20px] w-[150px]'>
                    <ul>
                        {userAvatarItems.map((item:any,index:any)=>(
                        <div key={index} className='flex p-2 hover:bg-gray-400 cursor-pointer'>
                              <Link onClick={item.link=="/"? handleLogout:()=>null} className="flex" to={item.link}><span className='px-2'>{item.Icon}</span>
                                    <li className=''>{item.label}</li>
                              </Link>  
                        </div>
                        ))}
                    </ul>
                </div>
        
                 :null }
    </div>
      
   </>

  )
}

export default UserAvatar