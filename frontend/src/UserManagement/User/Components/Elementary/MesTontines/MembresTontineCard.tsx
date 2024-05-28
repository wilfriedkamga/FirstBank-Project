import React from 'react'


type ChildComponentProps={
  nom:string,
  phone:string,
  role:string,
}

const MembresTontineCard= ({nom,phone,role}:ChildComponentProps) => {
  return (
    <div className='bg-white h-[80px] flex justify-between p-2 shadow-md rounded-sm'>
      <div className='flex flex-col justify-between'>
         <div className='font-bold'>{nom}</div>
         <div className=''>{phone}</div>
      </div>
      <div className='flex flex-col justify-between'>
         <div className='font-semibold'>{role}</div>
         <div className='w-[30px] h-[30px] bg-red-600 text-lg font-bold text-white text-center rounded-full '>--</div>
      </div>
    
    </div>
  )
}

export default MembresTontineCard