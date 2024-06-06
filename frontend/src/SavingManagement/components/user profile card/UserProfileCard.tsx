import React, { useEffect, useState } from 'react'
import Variable from '../../../Variable'

const UserProfileCard = () => {
  const [photo,setPhoto]=useState("")
  useEffect(()=>{
    const user=Variable.getLocalStorageItem("user")
    setPhoto(user.user.photo)
  },[])
  return (
    <div className='w-full'>
       <div className="rounded-t-lg h-56 overflow-hidden bg-red-700">
       </div>
       <div className="ml-5 md:ml-16 w-36 h-36 relative -mt-16  border-4 border-gray-400 rounded-full overflow-hidden">
        <img className="object-cover object-center h-36" src={photo} alt='Woman looking front' />
       </div>
    </div>
  )
}

export default UserProfileCard
