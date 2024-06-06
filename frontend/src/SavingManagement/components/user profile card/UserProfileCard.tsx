import React, { useEffect, useState } from 'react'
import Variable from '../../../Variable'
import { UserAvatar } from '../header/UserAvatar'

const UserProfileCard = () => {
  const [photo,setPhoto]=useState("")
  useEffect(()=>{
    const user=Variable.getLocalStorageItem("user")
    setPhoto(user.user.photo)
  },[])
  return (
    <div className='w-full'>
       <div className="rounded-t-lg md:h-40 h-30 overflow-hidden bg-red-700">
       </div>
       <div className="ml-5 md:ml-16 w-36 h-36 relative -mt-16  border-2 border-white rounded-full overflow-hidden">
        {photo?<img className="object-cover object-center h-30" src={photo} alt='Woman looking front' />:
        <div className="ml-5 md:ml-16 w-36 h-36 relative -mt-16  border-2 border-white rounded-full overflow-hidden">
          
        </div>}
       </div>
    </div>
  )
}

export default UserProfileCard
