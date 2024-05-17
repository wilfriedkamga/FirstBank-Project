import React, { useRef, useState } from 'react'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';



const UserAvatar = () => {
    const userAvatarItems=[
        {
            "label":"Profil",
            "link":"/",
            "Icon":<SpaceDashboardSharpIcon/>
        },
        
        {
            "label":"Déconnexion",
            "link":"#",
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

      window.addEventListener('click',e=>{
        if(e.target!=menuRef.current && e.target!=butRef.current){
            setToogle(false)
        }
      })
      
  return (
   <> 
   
    <div className=''>
        <div ref={butRef} onClick={()=>setToogle(!toogle)}className='w-[45px]  flex justify-center items-center font-bold h-[45px] rounded-full text-white  bg-blue-600 cursor-pointer'>
                JN
        </div>
        {toogle?
                <div ref={menuRef} className='absolute bg-gray-100 rounded-lg border-[2px] right-[20px] w-[150px]'>
                    <ul>
                        {userAvatarItems.map((item:any,index:any)=>(
                        <div key={index} className='flex p-2 hover:bg-gray-400 cursor-pointer'>
                                <span className='px-2'>{item.Icon}</span>
                                <li className=''>{item.label}</li>
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