import React, { useRef, useState } from 'react'
import { getInitials } from '../Utils'

const UserInfo = () => {
    const [toogle,setToogle]=useState(false)
    const butRef=useRef<HTMLDivElement | null>(null);
    const menuRef=useRef<HTMLDivElement | null>(null);

    window.addEventListener('click',e=>{
        if(e.target!=menuRef.current && e.target!=butRef.current){
            setToogle(false)
        }
      })

  return (
    <div className='relative'>
        <div onClick={()=>setToogle(!toogle)} ref={butRef} className='group inline-flex cursor-pointer justify-center font-bold items-center flex items-center w-7 h-7 bg-blue-600 rounded-full outline-none'>
            {getInitials("JUnior")}
        </div>
        {toogle &&
            <div ref={menuRef} className='absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 rounded-lg transform px-4 sm:px-0 '>
                    <div className='flex items-center gap-4 rounded-lg shadow-lg bg-white p-8'>
                            <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl '>
                            <span className='text-center font-bold'>
                                {getInitials("JUNIOR")}
                            </span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                            <p className='text-black text-xl font-bold'>KAMGA DJIDJOU</p>
                            <span className='text-base text-gray-500'>ADMINISTRATEUR</span>
                            <span className='text-blue-500'>
                                +2376506666666
                            </span>
                            </div>
                    </div>
            </div>
            
            }
    </div>
  )
}

export default UserInfo